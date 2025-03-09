import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator";
import { User } from "src/auth/interface";

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    @Get("me")
    getMe(@GetUser() user:User) {
        return user
    }
}