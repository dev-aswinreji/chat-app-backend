import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageSchema } from "./schema";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { ConversationModule } from "src/conversation/conversation.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Message", schema: MessageSchema }]),
        ConversationModule
    ],
    controllers: [MessageController],
    providers: [MessageService]
})

export class MessageModule { }