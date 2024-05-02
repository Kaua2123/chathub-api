import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module/database.module';
import { FriendRequestsService } from './friend-requests.service';
import { friendRequestsProviders } from './friend-requests.providers';
import { FriendRequestsController } from './friend-requests.controller';
import { UsersModule } from '../users/users.module';
import { usersProviders } from '../users/users.providers';
import { notificationsProviders } from '../notifications/notifications.providers';
import { NotificationsModule } from '../notifications/notifications.module';
import { NotificationsService } from '../notifications/notifications.service';
import { blockedUsersProviders } from '../blocked-users/blocked-users-providers';
import { BlockedUsersModule } from '../blocked-users/blocked-users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    NotificationsModule,
    BlockedUsersModule,
  ],
  controllers: [FriendRequestsController],
  providers: [
    FriendRequestsService,
    NotificationsService,
    ...friendRequestsProviders,
    ...usersProviders,
    ...notificationsProviders,
    ...blockedUsersProviders,
  ],
  exports: [FriendRequestsService],
})
export class FriendRequestsModule {}
