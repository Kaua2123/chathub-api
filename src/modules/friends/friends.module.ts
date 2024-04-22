import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module/database.module';
import { friendsProviders } from './friends.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...friendsProviders],
  exports: [],
})
export class FriendsModule {}
