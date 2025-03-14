import { Global, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [AuthService]

})

export class AuthModule { }