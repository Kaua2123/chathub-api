import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module/database.module';
import { UsersModule } from '../users/users.module';
import { ConversationsController } from './conversations.controller';
import { usersProviders } from '../users/users.providers';
import { ConversationsService } from './conversations.service';
import { conversationsProviders } from './conversations.providers';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ConversationsController],
  providers: [
    ConversationsService,
    ...conversationsProviders,
    ...usersProviders,
  ],
  exports: [],
})
export class ConversationsModule {}
