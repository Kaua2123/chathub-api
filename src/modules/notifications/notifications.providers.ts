import * as constants from 'src/constants';
import { Notification } from './notification.model';

export const notificationsProviders = [
  {
    provide: constants.NOTIFICATIONS_REPOSITORY,
    useValue: Notification,
  },
];
