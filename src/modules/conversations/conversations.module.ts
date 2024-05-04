import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module/database.module';
import { UsersModule } from '../users/users.module';
import { ConversationsController } from './conversations.controller';
import { usersProviders } from '../users/users.providers';
import { ConversationsService } from './conversations.service';
import { conversationsProviders } from './conversations.providers';
import { blockedUsersProviders } from '../blocked-users/blocked-users-providers';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ConversationsController],
  providers: [
    ConversationsService,
    ...conversationsProviders,
    ...usersProviders,
    blockedUsersProviders[0],
  ],
  exports: [],
})
export class ConversationsModule {}
