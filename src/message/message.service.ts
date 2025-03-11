import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Schema } from "mongoose";
import { Message } from "./interface";
import { User } from "src/auth/interface";
import { ConversationService } from "src/conversation/conversation.service";
import { MyGateWay } from "src/gateway/gateway";

Injectable({})
export class MessageService {
    constructor(
        @InjectModel('Message') private readonly messageModel: Model<Message>,
        private readonly conversationService: ConversationService,
        private gateway: MyGateWay

    ) { }

    async getMessages(user: User, receiverId: string) {

        const senderId: string = user.id

        const conversation = await this.conversationService.getConversation(senderId, receiverId)
        await conversation.populate("messages")
        return conversation.messages

    }


    async sendMessage(user: User, { id }: { id: string }, { message }: Message) {

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

        //Socket to functionality call will go here
        this.gateway.getReceiverSocketId(receiverId, newMessage)
        return newMessage
    }

}