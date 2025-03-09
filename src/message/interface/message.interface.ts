import { Document } from "mongoose";

export interface Message extends Document {
    senderId: string;
    receiverId: string;
    message: string;
}