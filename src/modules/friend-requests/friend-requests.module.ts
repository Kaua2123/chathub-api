import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class FriendRequestsModule {}
