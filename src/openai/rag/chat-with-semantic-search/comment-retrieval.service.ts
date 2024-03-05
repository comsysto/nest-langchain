import { VectorStore } from "@langchain/core/vectorstores";
import { Document } from "@langchain/core/documents";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CommentRetrievalService {
  constructor(private readonly vectorStore: VectorStore) {}

  async getByChargingStationIdAndSearchTerms(chargingStationId: string, searchTerms: string[]): Promise<Document[]> {
    console.log(
      `retrieving comments for charging station ${chargingStationId} with search terms ${searchTerms.join()}`,
    );
    const resultsPromises = searchTerms.map((searchTerm) =>
      this.vectorStore.similaritySearch(searchTerm, 3, { chargingStationId }),
    );

    const results = await Promise.all(resultsPromises);

    const uniqueResults = results.flat().reduce<Document[]>((result, entry) => {
      if (result.map((e) => e.metadata.id).includes(entry.metadata.id)) {
        return result;
      }

      return [...result, entry];
    }, []);

    console.log(
      "retrieved comments",
      uniqueResults.map((entry) => entry.pageContent),
    );

    return uniqueResults;
  }
}
