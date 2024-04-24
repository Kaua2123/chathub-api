import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module/database.module';
import { FriendRequestsService } from './friend-requests.service';
import { friendRequestsProviders } from './friend-requests.providers';
import { FriendRequestsController } from './friend-requests.controller';
import { UsersModule } from '../users/users.module';
import { usersProviders } from '../users/users.providers';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [FriendRequestsController],
  providers: [
    FriendRequestsService,
    ...friendRequestsProviders,
    ...usersProviders,
  ],
  exports: [FriendRequestsService],
})
export class FriendRequestsModule {}
