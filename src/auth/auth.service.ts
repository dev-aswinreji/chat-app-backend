import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./interface";
import { AuthDto } from "./dto";


@Injectable({})

export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }
    login(dto: AuthDto) {
        const newUser = new this.userModel(dto);
        return newUser.save()
    }
}