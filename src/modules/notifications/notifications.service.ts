import { Inject, Injectable, Param } from '@nestjs/common';
import { NOTIFICATIONS_REPOSITORY } from 'src/constants';
import { Notification } from './notification.model';

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

    return notification;
  }
}

// enviar notificaçoes assim que faz outras ativiades
// friend request: assim qm adnar u mpedido de amizade, criar uma notificaçaoa enviadndo pro
// usuario que recebeu o peiddo de ammizade
// message: mesma coisa. assim q enviar uma mensagem criar uma notificaçao envinado pro
// usuario que recebeu o pedido de amizade.
