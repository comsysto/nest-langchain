# LangChain Examples with NestJS

This repository contains multiple example use cases implemented with
[NestJS](https://docs.nestjs.com/) and [LangChain (TypeScript)](https://js.langchain.com/docs/get_started/introduction)

## Running the Application locally

### Preperation and Setup

This application uses external services like a vector database.  
Run following command(s) to set everything up as need.

1. Install Chroma: `pip install chromadb`
2. Run Chroma: `chroma run --path ./chromadb`

> The application will load documents in Chroma on start up. If you restart the application multiple times, the documents will be lodaded multiple times, as well. This will lead to bad search results. To fix this, simply delete the ./chromadb directory and restart Chroma and the application.

### Starting the Application

1. Provide the env variable `OPENAI_API_KEY` (e.g. by creating a file called `.env` in the root of this project)
2. Run `npm i`
3. Run `npm run start:dev`

This will start the NestJS application running on [http://localhost:3000](http://localhost:3000)

You can find example requests [here](http/requests.http).

## Examples

### 1. Execute a simple prompt

[SimpleOpenAIChatService.chat(prompt)](src/openai/simple-chat/simple-openai-chat.service.ts)  
API Path: `/chat?prompt={USER_PROMPT}`

This example takes the prompt as it is and sends it to OpenAI's Chat Completion API and returns the result.

### 2. Format incorrectly formatted addresses

[SimpleOpenAIChatService.chatWithTemplate(address)](src/openai/simple-chat/simple-openai-chat.service.ts)  
API Path: `/format-address?address={INPUT_ADDRESS}`

This example takes any address where the parts might be in any order and return the same address formatted like: `streetName houseNumber, zipCode city`.

### 3. Format incorrectly formatted addresses and retrieve the zip code if it is missing

[OpenAIChatWithToolsService.chatWithTools(address)](src/openai/chat-with-tools/openai-chat-with-tools.service.ts)  
API Path: `/format-address-with-tools?address={INPUT_ADDRESS}`

Similar to example #2 with the difference that a tool is provided to fetch a zip code if it is missing in the input address. This is a basic implementation of an AI-Agent with Tool/Function calling.

### 4. Find charging stations nearby considering information from the comments.

[ChatWithSemanticSearchService.chatWithSemanticSearch(query)](src/openai/rag/chat-with-semantic-search/chat-with-semantic-search.service.ts)  
API Path: `/charging-station-query?query={USER_QUERY}`

> Example query: Find a charging station near munich, where I can eat something.

This example will retrieve charging stations near the given city and try to filter them by the provided criteria, performing a semantic search using embeddings and a vector store.
