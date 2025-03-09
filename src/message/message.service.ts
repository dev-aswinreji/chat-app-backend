import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message } from "./interface";

Injectable({})
export class MessageService {
    constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) { }
    async sendMessage(id: string ) {
        return id
    }
}