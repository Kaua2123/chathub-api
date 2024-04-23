import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module/database.module';
import { FriendRequestsService } from './friend-requests.service';
import { friendRequestsProviders } from './friend-requests.providers';
import { FriendRequestsController } from './friend-requests.controller';
import { FriendsModule } from '../friends/friends.module';
import { friendsProviders } from '../friends/friends.providers';
import { UsersModule } from '../users/users.module';
import { usersProviders } from '../users/users.providers';

@Module({
  imports: [DatabaseModule, FriendsModule, UsersModule],
  controllers: [FriendRequestsController],
  providers: [
    FriendRequestsService,
    ...friendRequestsProviders,
    ...friendsProviders,
    ...usersProviders,
  ],
  exports: [FriendRequestsService],
})
export class FriendRequestsModule {}
