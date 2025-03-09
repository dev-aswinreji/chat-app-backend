import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Schema } from "mongoose";
import { Message } from "./interface";
import { User } from "src/auth/interface";
import { ConversationService } from "src/conversation/conversation.service";

Injectable({})
export class MessageService {
    constructor(
        @InjectModel('Message') private readonly messageModel: Model<Message>,
        private readonly conversationService: ConversationService,

    ) { }
    async sendMessage(user: User, id: string, { message }: Message) {
        const receiverId = id
        const senderId = user.id

        const conversation = await this.conversationService.getConversation(senderId, receiverId)

        const newMessage = await this.messageModel.create({
            senderId,
            receiverId,
            message
        })
        conversation.messages.push(newMessage._id as mongoose.Types.ObjectId)
        await Promise.all([conversation.save(), newMessage.save()])

        return newMessage
    }
}