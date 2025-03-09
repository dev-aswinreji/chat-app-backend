import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationSchema } from './schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: "Conversation", schema: ConversationSchema }])],
    controllers: [ConversationController]
})
export class ConversationModule { }
