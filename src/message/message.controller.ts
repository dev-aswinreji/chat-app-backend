import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator";
import { User } from "src/auth/interface";
import { MessageService } from "./message.service";
import { Message } from "./interface";

@UseGuards(AuthGuard('jwt'))
@Controller('message')
export class MessageController {
    constructor(private message: MessageService) { }


    @Get(':id')
    getMessage(@GetUser() user: User, @Param() id: string) {
        return this.message.getMessages(user, id)
    }

    @Post('send/:id')
    sendMessage(@GetUser() user: User, @Param() id: string, @Body() message: Message) {
        return this.message.sendMessage(user, id, message)
    }


}