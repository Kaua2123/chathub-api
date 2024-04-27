import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module/database.module';
import { ConversationService } from './conversation.service';
import { usersProviders } from '../users/users.providers';
import { conversationProviders } from './conversation.providers';
import { UsersModule } from '../users/users.module';
import { ConversationController } from './conversation.controller';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ConversationController],
  providers: [ConversationService, ...conversationProviders, ...usersProviders],
  exports: [],
})
export class ConversationModule {}
