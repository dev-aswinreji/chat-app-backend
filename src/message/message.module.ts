import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageSchema } from "./schema";
import { MessageController } from "./message.controller";
import { ConversationModule } from "src/conversation/conversation.module";
import { MessageService } from "./message.service";
import { GatewayModule } from "src/gateway/gateway.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Message", schema: MessageSchema }]),
        ConversationModule,
        GatewayModule
    ],
    controllers: [MessageController],
    providers: [MessageService]
})

export class MessageModule { }