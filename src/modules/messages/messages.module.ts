import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module/database.module';
import { MessagesService } from './messages.service';
import { messagesProviders } from './messages.providers';
import { MessagesController } from './messages.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MessagesController],
  providers: [MessagesService, ...messagesProviders],
})
export class MessagesModule {}
