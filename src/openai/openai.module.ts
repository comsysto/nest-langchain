import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { OpenAIChatWithToolsService } from "./chat-with-tools/openai-chat-with-tools.service";
import { openAIServiceProvider } from "./openai-client.provider";
import { ChatWithSemanticSearchService } from "./rag/chat-with-semantic-search/chat-with-semantic-search.service";
import { chromaProvider } from "./rag/chat-with-semantic-search/chroma.provider";
import { CommentRetrievalService } from "./rag/chat-with-semantic-search/comment-retrieval.service";
import { SimpleOpenAIChatService } from "./simple-chat/simple-openai-chat.service";

@Module({
  providers: [
    openAIServiceProvider,
    SimpleOpenAIChatService,
    OpenAIChatWithToolsService,
    chromaProvider,
    ChatWithSemanticSearchService,
    CommentRetrievalService,
  ],
  exports: [SimpleOpenAIChatService, OpenAIChatWithToolsService, ChatWithSemanticSearchService],
  imports: [HttpModule],
})
@Global()
export class OpenAIModule {}
