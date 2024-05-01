import { Notification, NotificationType } from '../notification.model';

export abstract class NotificationsRepository {
  abstract findUserNotifications(id: number): Promise<Notification[]>;

  abstract create(
    content: string,
    type: NotificationType,
    UserId: number,
    ConversationId?: number,
  ): Promise<Notification>;

  abstract delete(id: number): Promise<{ message: string }>;
}
