import { Conversation } from '../conversations/conversation.model';
import * as constants from '../../constants';

export const conversationProviders = [
  {
    provide: constants.CONVERSATION_REPOSITORY,
    useValue: Conversation,
  },
];
