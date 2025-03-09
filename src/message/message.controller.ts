import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { MessageService } from "./message.service";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('message')
export class MessageController {
    constructor(private message: MessageService) { }

    @Post('send/:id')
    sendMessage(@Param() id: string) {
        return this.message.sendMessage(id )
    }
}