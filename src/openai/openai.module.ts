import { Global, Module } from "@nestjs/common";
import { openAIServiceProvider } from "./openai-client.provider";
import { SimpleOpenAIChatService } from "./simple-chat/simple-openai-chat.service";
import { OpenAIChatWithToolsService } from "./chat-with-tools/openai-chat-with-tools.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  providers: [openAIServiceProvider, SimpleOpenAIChatService, OpenAIChatWithToolsService],
  exports: [SimpleOpenAIChatService, OpenAIChatWithToolsService],
  imports: [HttpModule],
})
@Global()
export class OpenAIModule {}
