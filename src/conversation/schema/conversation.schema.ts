import { Schema } from "mongoose";

export const ConversationSchema = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
}, { timestamps: true })