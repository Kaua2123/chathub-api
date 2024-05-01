import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NotificationsRepository } from './repositories/notifications-repository';
import { NotificationType } from './notification.model';

@Controller('/notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  @Get('/findUserNotifications/:id')
  async findUserNotifications(@Param('id') id: number) {
    return this.notificationsRepository.findUserNotifications(id);
  }

  @Post('/create')
  async create(
    content: string,
    type: NotificationType,
    UserId: number,
    ConversationId?: number,
  ) {
    return this.notificationsRepository.create(
      content,
      type,
      UserId,
      ConversationId,
    );
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return this.notificationsRepository.delete(id);
  }
}
