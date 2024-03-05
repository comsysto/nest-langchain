import { Chroma } from "@langchain/community/vectorstores/chroma";
import { VectorStore } from "@langchain/core/vectorstores";
import { FactoryProvider } from "@nestjs/common";
import { commentDocuments } from "./comment-documents";
import { OpenAIEmbeddings } from "@langchain/openai";

export const chromaProvider: FactoryProvider<VectorStore> = {
  provide: VectorStore,
  useFactory: async () => {
    return await Chroma.fromTexts(
      commentDocuments.map((comment) => comment.pageContent),
      commentDocuments.map((comment) => comment.metadata),
      new OpenAIEmbeddings(),
      {
        url: "http://0.0.0.0:8000",
        collectionName: "charging-station-comments",
      },
    );
  },
};
