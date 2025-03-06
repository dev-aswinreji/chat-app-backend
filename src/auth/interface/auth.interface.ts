import { Document } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    gender: string;
    password: string;
}