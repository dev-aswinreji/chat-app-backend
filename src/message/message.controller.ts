import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator";
import { User } from "src/auth/interface";
import { MessageService } from "./message.service";

@UseGuards(AuthGuard('jwt'))
@Controller('message')
export class MessageController {
    constructor(private message: MessageService) { }

    @Post('send/:id')
    sendMessage(@GetUser() user: User, @Param() id: string, @Body() message: any) {
        return this.message.sendMessage(user, id, message)
    }
}