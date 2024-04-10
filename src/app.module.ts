import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { OpenAIModule } from "./openai/openai.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [OpenAIModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
