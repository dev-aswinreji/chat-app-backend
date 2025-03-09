import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageSchema } from "./schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: "Message", schema: MessageSchema }])],
})

export class MessageModule { }