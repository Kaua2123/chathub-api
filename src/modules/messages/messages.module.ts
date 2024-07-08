import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module/database.module';
import { MessagesService } from './messages.service';
import { messagesProviders } from './messages.providers';
import { MessagesController } from './messages.controller';
import { notificationsProviders } from '../notifications/notifications.providers';
import { NotificationsService } from '../notifications/notifications.service';
import { ConversationsService } from '../conversations/conversations.service';
import { conversationsProviders } from '../conversations/conversations.providers';
import { blockedUsersProviders } from '../blocked-users/blocked-users-providers';
import { usersProviders } from '../users/users.providers';
import { BlockedUsersService } from '../blocked-users/blocked-users.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    NotificationsService,
    ConversationsService,
    BlockedUsersService,
    UsersService,
    ...messagesProviders,
    ...notificationsProviders,
    ...conversationsProviders,
    ...blockedUsersProviders,
    ...usersProviders,
  ],
})
export class MessagesModule {}
