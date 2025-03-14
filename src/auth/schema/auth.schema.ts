import { Schema } from "mongoose";

export const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    // email: { type: String, required: true, unique: true },
    fullname: { type: String, requred: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    profilePic: { type: String, required: true }

}, { timestamps: true })