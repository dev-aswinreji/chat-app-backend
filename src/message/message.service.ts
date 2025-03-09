import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message } from "./interface";
import { User } from "src/auth/interface";
import { ConversationService } from "src/conversation/conversation.service";

Injectable({})
export class MessageService {
    constructor(
        @InjectModel('Message') private readonly messageModel: Model<Message>,
        private readonly conversationService: ConversationService,

    ) { }
    async sendMessage(user: User, id: string) {
        const receiverId = id
        const senderId = user
        console.log(senderId, 'sendid', receiverId, 'reciecer')
        return user
    }
}