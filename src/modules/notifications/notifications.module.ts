import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module/database.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { notificationsProviders } from './notifications.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, ...notificationsProviders],
})
export class NotificationsModule {}
