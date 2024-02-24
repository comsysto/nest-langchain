import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SimpleOpenAIChatService {
  constructor(private readonly openAI: ChatOpenAI) {}

  async chat(prompt: string): Promise<string> {
    return (await this.openAI.invoke(prompt)).content as string;
  }

  private stringOutputParser = new StringOutputParser();
  private templatePrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `The following text includes a possibly malformed address. It should include a streetAddress, houseNumber, city and a zipCode.
      Return the address in the format: streetAddress houseNumber, zipCode city.

      Example: Riesstraße 22, 80992 München
  
      If any field is missing, omit it in the response.

      Return only the formatted address no addtional explanation or text.

      {inputAddress}`,
    ],
  ]);

  async chatWithTemplate(address: string): Promise<string> {
    const llmChain = this.templatePrompt.pipe(this.openAI).pipe(this.stringOutputParser);

    return await llmChain.invoke({ inputAddress: address });
  }
}
