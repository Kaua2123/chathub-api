import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module/database.module';
import { MessagesService } from './messages.service';
import { messagesProviders } from './messages.providers';
import { MessagesController } from './messages.controller';
import { notificationsProviders } from '../notifications/notifications.providers';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    NotificationsService,
    ...messagesProviders,
    ...notificationsProviders,
  ],
})
export class MessagesModule {}
