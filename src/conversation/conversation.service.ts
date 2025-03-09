import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Conversation } from "./interface";

Injectable({})
export class ConversationService {
    constructor(@InjectModel('Conversation') private readonly conversationModel: Model<Conversation>) { }
    async getConversation(senderId: string, receiverId: string, message: string) {
        let conversation = await this.conversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = await this.conversationModel.create({
                participants: [senderId, receiverId],
                message: [senderId, receiverId, message]
            })
        }
        return conversation.message
    }
}