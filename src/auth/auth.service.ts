import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./interface";


@Injectable({})

export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }
    login() {

        return 
    }
}