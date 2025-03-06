import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
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
        try {

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
            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${dto.username}`
            const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${dto.username}`

            const user = {
                username: dto.username,
                email: dto.email,
                password: dto.password,
                gender: dto.gender,
                profilePic: dto.gender === "male" ? boyProfilePic : girlProfilePic,
            }
            const newUser = new this.userModel(user);
            return newUser.save()

        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async login({ username, password }: AuthLoginDto) {
        try {

            const user = await this.userModel.findOne({ username })
            if (!user) {
                throw new NotFoundException()
            }
            const hash = await argon.verify(user.password, password)
            console.log(hash)
            if (!hash) {
                throw new UnauthorizedException()
            }
            return user

        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async dropCollection() {
        const drop = await this.userModel.deleteMany({})
        return drop
    }
}