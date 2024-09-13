import { StringOutputParser } from "@langchain/core/output_parsers";
import { HandlebarsPromptTemplate } from "langchain/experimental/prompts/handlebars";
import { ChatOpenAI } from "@langchain/openai";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SimpleOpenAIChatService {
  constructor(private readonly openAI: ChatOpenAI) {}

  async chat(prompt: string): Promise<string> {
    return (await this.openAI.invoke(prompt)).content as string;
  }

  private stringOutputParser = new StringOutputParser();

  private promptTemplate = HandlebarsPromptTemplate.fromTemplate(
    `After INPUT you will receive a possibly incorrectly formatted address. 
      It should include a street, houseNumber, city and a zipCode.
      Return the address as json in the format:

      {
        "street": string,
        "houseNumber": string, 
        "zipCode: string,
        "city": string
      }

      Example: 

      {
        "street": "Riesstraße",
        "houseNumber": "22", 
        "zipCode: "80992",
        "city": "München"
      }
  
      If any field is missing, set the value to null.

      Return only the json no additional explanation, text or formatting.

      INPUT
      {{inputAddress}}`,
  );

  async chatWithTemplate(address: string): Promise<string> {
    const llmChain = this.promptTemplate.pipe(this.openAI).pipe(this.stringOutputParser);

    return llmChain.invoke({ inputAddress: address });
  }
}
