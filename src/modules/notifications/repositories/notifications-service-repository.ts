import { Injectable } from '@nestjs/common';
import { Notification, NotificationType } from '../notification.model';
import { NotificationsService } from '../notifications.service';
import { NotificationsRepository } from './notifications-repository';

@Injectable()
export class NotificationsServiceRepository implements NotificationsRepository {
  constructor(private readonly notificationsService: NotificationsService) {}

  async findUserNotifications(id: number): Promise<Notification[]> {
    return this.notificationsService.findUserNotifications(id);
  }

  async create(
    content: string,
    type: NotificationType,
    UserId: number,
    ConversationId?: number,
  ): Promise<Notification> {
    return this.notificationsService.create(
      content,
      type,
      UserId,
      ConversationId,
    );
  }

  async delete(id: number): Promise<{ message: string }> {
    return this.notificationsService.delete(id);
  }
}
