import { ChatOpenAI } from "@langchain/openai";
import { Injectable } from "@nestjs/common";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { HttpService } from "@nestjs/axios";
import { CommentRetrievalService } from "./comment-retrieval.service";
import { chargingStations } from "./charging-stations.mock";

@Injectable()
export class ChatWithSemanticSearchService {
  constructor(
    private readonly openAI: ChatOpenAI,
    private readonly commentRetrievalService: CommentRetrievalService,
    private readonly httpService: HttpService,
  ) {}

  async chatWithSemanticSearch(query: string): Promise<string> {
    const agent = await createOpenAIFunctionsAgent({
      llm: this.openAI,
      tools: [this.chargingStationsNearbyTool, this.getRelevantCommentsTool],
      prompt: this.prompt,
    });
    const agentExecutor = new AgentExecutor({
      agent,
      tools: [this.chargingStationsNearbyTool, this.getRelevantCommentsTool],
      verbose: false,
    });

    return (await agentExecutor.invoke({ userQuery: query })).output as string;
  }

  private prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a helpful assistant which helps finding a charging station near the location provided by the user.
      Use the given tools for finding the charging station based on the location and additional criteria based on the retrieved comments.
      It is very IMPORTANT that you only use the information in the comments and not add additional information yourself.
      In addition to the charging station, provide the relevant comments, as well.
      `,
    ],
    ["user", "{userQuery}"],
    // this placeholder is needed for the agent to store intermediate information over multiple requests to OpenAI
    new MessagesPlaceholder("agent_scratchpad"),
  ]);

  private chargingStationsNearbyTool = new DynamicStructuredTool({
    name: "get-charging-station-nearby",
    description: "Retrieve the zip code from the city and street name",
    schema: z.object({
      latitude: z.string().describe("The latitude of the users location"),
      longitude: z.string().describe("The longitude of the users location"),
    }),
    func: async ({ latitude, longitude }) => {
      try {
        // Can be enabled, if charging station service is running locally
        // const response = await this.httpService.axiosRef.get(
        //   `http://localhost:8080/stations/near/${latitude}/${longitude}?radius=10`,
        // );

        const response = { data: chargingStations };

        if (response.data.length > 0) {
          console.log("found charging stations", response.data);
          return JSON.stringify(response.data);
        }

        return "No charging stations found";
      } catch (e) {
        console.error(e);

        return "No charging stations found";
      }
    },
  });

  private getRelevantCommentsTool = new DynamicStructuredTool({
    name: "get-relevant-comments",
    description: `
        Retrieve relevant comments based on search terms.
        This tool should be used to get more detailed information about a charging station.
    `,
    schema: z.object({
      chargingStationId: z.string().describe("Id of the charging station"),
      searchTerms: z
        .string()
        .array()
        .describe("search terms for filtering for relevant comments. Do not provide more than 3 search terms"),
    }),
    func: async ({ chargingStationId, searchTerms }) => {
      const relevantComments = await this.commentRetrievalService.getByChargingStationIdAndSearchTerms(
        chargingStationId,
        searchTerms,
      );

      return JSON.stringify(relevantComments);
    },
  });
}
