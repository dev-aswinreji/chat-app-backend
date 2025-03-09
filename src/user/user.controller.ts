import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator";
import { User } from "src/auth/interface";
import { UserService } from "./user.service";

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
    constructor(private service: UserService) { }
    @Get("")
    getMe(@GetUser() user: User) {
        return this.service.getUserForSidebar(user)
    }
}