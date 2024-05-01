import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module/database.module';
import { BlockedUsersService } from './blocked-users.service';
import { blockedUsersProviders } from './blocked-users-providers';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';
import { BlockedUsersController } from './blocked-users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [BlockedUsersController],
  providers: [
    BlockedUsersService,
    UsersService,
    ...blockedUsersProviders,
    ...usersProviders,
  ],
  exports: [],
})
export class BlockedUsersModule {}
