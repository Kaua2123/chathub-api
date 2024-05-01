import { Inject, Injectable } from '@nestjs/common';
import { NOTIFICATIONS_REPOSITORY } from 'src/constants';
import { Notification } from './notification.model';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATIONS_REPOSITORY)
    private readonly notificationModel: typeof Notification,
  ) {}
}

// enviar notificaçoes assim que faz outras ativiades
// friend request: assim qm adnar u mpedido de amizade, criar uma notificaçaoa enviadndo pro
// usuario que recebeu o peiddo de ammizade
// message: mesma coisa. assim q enviar uma mensagem criar uma notificaçao envinado pro
// usuario que recebeu o pedido de amizade.
