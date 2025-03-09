import mongoose, { Document } from "mongoose";

export interface Conversation extends Document {
    participants: [{
        type: mongoose.Types.ObjectId,
        ref: mongoose.RefType
    }],
    message: [{
        type: mongoose.Types.ObjectId,
        ref: mongoose.RefType,
        default: []
    }]
}