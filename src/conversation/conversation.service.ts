import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Conversation } from "./interface";

Injectable({})
export class ConversationService {
    constructor(@InjectModel('Conversation') private readonly conversationModel: Model<Conversation>) { }
    
}