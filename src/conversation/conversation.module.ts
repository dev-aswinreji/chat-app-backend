import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationSchema } from './schema';
import { ConversationService } from './conversation.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: "Conversation", schema: ConversationSchema }])],
    controllers: [ConversationController],
    providers: [ConversationService],
    exports: [ConversationService]
})
export class ConversationModule { }
