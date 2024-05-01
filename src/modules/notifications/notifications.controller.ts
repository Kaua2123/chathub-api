import { Controller, Get, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('/findUserNotifications/:id')
  async findUserNotifications(@Param('id') id: number) {
    return this.notificationsService.findUserNotifications(id);
  }
}
