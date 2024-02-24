import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { OpenAIModule } from "./openai/openai.module";

@Module({
  imports: [OpenAIModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
