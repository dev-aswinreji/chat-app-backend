import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./interface";
import { AuthDto } from "./dto";


@Injectable({})

export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }
    async signup(dto: AuthDto) {
        const isEmailExists = await this.userModel.findOne({ email: dto.email })
        if (isEmailExists) {
            throw new ConflictException("Email already exists")
        }
        const isUsernameExists = await this.userModel.findOne({ username: dto.username })
        if (isUsernameExists) {
            throw new ConflictException("Username already exists")
        }
        const newUser = new this.userModel(dto);
        return newUser.save()
    }

    async dropCollection() {
        const drop = await this.userModel.deleteMany({})
        return drop
    }
}