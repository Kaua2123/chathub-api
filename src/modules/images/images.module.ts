import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module/database.module';
import { usersProviders } from '../users/users.providers';
import { UsersModule } from '../users/users.module';
import { conversationsProviders } from '../conversations/conversations.providers';
import { ConversationsModule } from '../conversations/conversations.module';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [DatabaseModule, UsersModule, ConversationsModule],
  controllers: [ImagesController],
  providers: [ImagesService, usersProviders[0], conversationsProviders[0]],
  exports: [],
})
export class ImagesModule {}
