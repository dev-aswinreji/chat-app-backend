import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../interface";

@Injectable({})
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        config: ConfigService,
        @InjectModel('User') private readonly userModel: Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')!
        })
    }
    async validate(payload: { sub: number, username: string }) {
        const user = await this.userModel.findById(payload.sub)
        return {
            id: user?._id,
        }
    }
}