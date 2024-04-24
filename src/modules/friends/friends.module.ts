import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module/database.module';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FriendsController],
  providers: [FriendsService, UsersService, ...usersProviders],
  exports: [],
})
export class FriendsModule {}
