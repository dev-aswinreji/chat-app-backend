import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import * as argon from 'argon2';
import { User } from "./interface";
import { AuthSignupDto } from "./dto";
import { AuthLoginDto } from "./dto/auth.login-dto";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";



@Injectable({})

export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private config: ConfigService,
        private jwt: JwtService
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

    }

    async login({ username, password }: AuthLoginDto) {

        const errorMessage = "Invalid credentials"
        const user = await this.userModel.findOne({ username })
        if (!user) {
            throw new NotFoundException(errorMessage)
        }
        const pwMatches = await argon.verify(user.password, password)
        if (!pwMatches) {
            throw new UnauthorizedException(errorMessage)
        }
        return this.signToken(user.id, user.username)

    }

    async dropCollection() {
        const drop = await this.userModel.deleteMany({})
        return drop
    }

    async signToken(userId: number, username: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            username
        }
        const secret = this.config.get('JWT_SECRET')!
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: secret
        })
        return {
            access_token: token
        }
    }

    async getUsersForSidebar(loggedUserId: Types.ObjectId) {
        return await this.userModel.find({ _id: { $ne: loggedUserId } }).select("-password")
    }
    logout() {
        return 'logout success'
    }
}