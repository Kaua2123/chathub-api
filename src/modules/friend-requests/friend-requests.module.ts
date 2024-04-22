import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module/database.module';
import { FriendRequestsService } from './friend-requests.service';
import { friendRequestsProviders } from './friend-requests.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [FriendRequestsService, ...friendRequestsProviders],
  exports: [FriendRequestsService],
})
export class FriendRequestsModule {}
