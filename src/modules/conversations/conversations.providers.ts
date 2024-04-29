import { Conversation } from './conversation.model';
import { ConversationsRepository } from './repositories/conversations-repository';
import { ConversationServiceRepository } from './repositories/conversations-service-repository';

import * as constants from '../../constants';

export const conversationsProviders = [
  {
    provide: constants.CONVERSATION_REPOSITORY,
    useValue: Conversation,
  },
  {
    provide: ConversationsRepository,
    useClass: ConversationServiceRepository,
  },
];
