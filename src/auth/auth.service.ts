import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as argon from 'argon2';
import { User } from "./interface";
import { AuthSignupDto } from "./dto";
import { AuthLoginDto } from "./dto/auth.login-dto";



@Injectable({})

export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }
    async signup(dto: AuthSignupDto) {
        const isEmailExists = await this.userModel.findOne({ email: dto.email })
        if (isEmailExists) {
            throw new ConflictException("Email already exists")
        }
        const isUsernameExists = await this.userModel.findOne({ username: dto.username })
        if (isUsernameExists) {
            throw new ConflictException("Username already exists")
        }

        const hash = await argon.hash(dto.password)
        dto.password = hash
        const newUser = new this.userModel(dto);
        return newUser.save()
    }

    async login({ username, password }: AuthLoginDto) {
        const user = await this.userModel.findOne({ username })
        if (!user) {
            throw new NotFoundException()
        }
        const hash = argon.verify(user.password, password)
        if (!hash) {
            throw new UnauthorizedException()
        }

        return user
    }

    async dropCollection() {
        const drop = await this.userModel.deleteMany({})
        return drop
    }
}