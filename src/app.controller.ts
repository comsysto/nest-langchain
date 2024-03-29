import { Controller, Get, Query } from "@nestjs/common";
import { OpenAIChatWithToolsService } from "./openai/chat-with-tools/openai-chat-with-tools.service";
import { SimpleOpenAIChatService } from "./openai/simple-chat/simple-openai-chat.service";
import { ChatWithSemanticSearchService } from "./openai/rag/chat-with-semantic-search/chat-with-semantic-search.service";

@Controller()
export class AppController {
  constructor(
    private readonly simpleOpenAIChatService: SimpleOpenAIChatService,
    private readonly openAIChatWithToolsService: OpenAIChatWithToolsService,
    private readonly chatWithSemanticSearch: ChatWithSemanticSearchService,
  ) {}

  @Get()
  helloWorld(): string {
    return "Hello World!";
  }

  @Get("chat")
  hello(@Query("prompt") prompt: string): Promise<string> {
    return this.simpleOpenAIChatService.chat(prompt);
  }

  @Get("format-address")
  formatAddress(@Query("address") address: string): Promise<string> {
    return this.simpleOpenAIChatService.chatWithTemplate(address);
  }

  @Get("format-address-with-tools")
  formatAddressWithTools(@Query("address") address: string): Promise<string> {
    return this.openAIChatWithToolsService.chatWithTools(address);
  }

  @Get("charging-station-query")
  getChargingStationByQuery(@Query("query") query: string): Promise<string> {
    return this.chatWithSemanticSearch.chatWithSemanticSearch(query);
  }
}
