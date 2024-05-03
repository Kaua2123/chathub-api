import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module/database.module';
import { UsersModule } from '../users/users.module';
import { ConversationsController } from './conversations.controller';
import { usersProviders } from '../users/users.providers';
import { ConversationsService } from './conversations.service';
import { conversationsProviders } from './conversations.providers';
import { blockedUsersProviders } from '../blocked-users/blocked-users-providers';
import { BlockedUsersModule } from '../blocked-users/blocked-users.module';

@Module({
  imports: [DatabaseModule, UsersModule, BlockedUsersModule],
  controllers: [ConversationsController],
  providers: [
    ConversationsService,
    ...conversationsProviders,
    ...usersProviders,
    ...blockedUsersProviders,
  ],
  exports: [],
})
export class ConversationsModule {}
