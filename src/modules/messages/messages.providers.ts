import * as constants from 'src/constants';
import { Message } from './message.model';

export const messagesProviders = [
  {
    provide: constants.MESSAGES_REPOSITORY,
    useValue: Message,
  },
];
