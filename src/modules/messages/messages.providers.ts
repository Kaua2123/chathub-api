import * as constants from 'src/constants';
import { Message } from './message.model';
import { MessagesRepository } from './repositories/messages-repository';
import { MessagesServiceRepository } from './repositories/messages-service-repository';

export const messagesProviders = [
  {
    provide: constants.MESSAGES_REPOSITORY,
    useValue: Message,
  },
  {
    provide: MessagesRepository,
    useClass: MessagesServiceRepository,
  },
];
