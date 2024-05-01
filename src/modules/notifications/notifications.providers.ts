import * as constants from 'src/constants';
import { Notification } from './notification.model';
import { NotificationsRepository } from './repositories/notifications-repository';
import { NotificationsServiceRepository } from './repositories/notifications-service-repository';

export const notificationsProviders = [
  {
    provide: constants.NOTIFICATIONS_REPOSITORY,
    useValue: Notification,
  },
  {
    provide: NotificationsRepository,
    useClass: NotificationsServiceRepository,
  },
];
