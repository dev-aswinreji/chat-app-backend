import { Document, Types } from "mongoose";

export interface Conversation extends Document {
    participants: Types.ObjectId[]
    messages: Types.ObjectId[]
}