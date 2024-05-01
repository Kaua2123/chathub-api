import { Inject, Injectable, Param } from '@nestjs/common';
import { NOTIFICATIONS_REPOSITORY } from 'src/constants';
import { Notification } from './notification.model';
import { NotificationNotFound } from './errors/notification-not-found';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATIONS_REPOSITORY)
    private readonly notificationModel: typeof Notification,
  ) {}

  async findUserNotifications(@Param('id') id: number) {
    const notifications = await this.notificationModel.findAll({
      where: { userId: id },
    });

    if (!notifications) throw new NotificationNotFound();

    return notifications;
  }

  async create(
    content: string,
    UserId: number,
    type: string,
    ConversationId?: number,
  ) {
    const notification = await this.notificationModel.create({
      content,
      UserId,
      type,
      ConversationId,
    });

    if (!notification) throw new NotificationNotFound();

    return notification;
  }

  async delete(@Param('id') id: number) {
    const notification = await this.notificationModel.findByPk(id);

    if (!notification) throw new NotificationNotFound();

    await notification.destroy();

    return {
      message: 'null',
    };
  }
}
