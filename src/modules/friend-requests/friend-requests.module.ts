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

@Module({
  imports: [DatabaseModule, UsersModule, NotificationsModule],
  controllers: [FriendRequestsController],
  providers: [
    FriendRequestsService,
    NotificationsService,
    ...friendRequestsProviders,
    ...usersProviders,
    ...notificationsProviders,
  ],
  exports: [FriendRequestsService],
})
export class FriendRequestsModule {}
