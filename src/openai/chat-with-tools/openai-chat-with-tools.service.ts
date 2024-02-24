import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { z } from "zod";

@Injectable()
export class OpenAIChatWithToolsService {
  constructor(
    private readonly openAI: ChatOpenAI,
    private readonly httpService: HttpService,
  ) {}

  async chatWithTools(address: string): Promise<string> {
    const agent = await createOpenAIFunctionsAgent({
      llm: this.openAI,
      tools: [this.zipCodeTool],
      prompt: this.prompt,
    });
    const agentExecutor = new AgentExecutor({ agent, tools: [this.zipCodeTool], verbose: true });

    return (await agentExecutor.invoke({ inputAddress: address })).output as string;
  }

  private prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `The provider text from the user includes a possibly malformed address. It should include a streetAddress, houseNumber, city and a zipCode.
      Return the address in the format: streetAddress houseNumber, zipCode city.
      
      If the zipCode is missing, retrieve it and add it to the result. 
      If any other field is missing, omit it in the response.

      Return only the formatted address no addtional explanation or text.

      EXAMPLES:
      - "Riesstraße 22 München" -> "Riesstraße 22, 80992 München"
      - "Oder Strasse 22 81669 München" -> "Oder Strasse 22, 81669 München"
      `,
    ],
    ["user", "{inputAddress}"],
    // this placeholder is needed for the agent to store intermediate information over multiple requests to OpneAI
    new MessagesPlaceholder("agent_scratchpad"),
  ]);

  private zipCodeTool = new DynamicStructuredTool({
    name: "get-zip-code",
    description: "Retrieve the zip code from the city and street name",
    schema: z.object({
      city: z.string().describe("The city name."),
      streetName: z.string().describe(`
        The name of the street.
        It is important that street names which include the word "Straße" or "Strasse" case insensitive are replaced it with "Str." or "str.".

        examples:
        - "Riesstraße" -> "Riesstr."
        - "Oder Starsse" -> "Oder Str."
        - "Nelkenweg" -> "Nelkenweg"
      `),
    }),
    func: async ({ city, streetName }) => {
      const response = await this.httpService.axiosRef.get(
        `https://openplzapi.org/de/Streets?name=${streetName}&locality=${city}`,
      );

      return response.data.find((entry) => entry.name === streetName)?.postalCode;
    },
  });
}
