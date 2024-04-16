import { Conversation } from './Conversation.model';
import * as constants from '../../constants';

export const ConversationsProviders = [
  {
    provide: constants.CONVERSATION_REPOSITORY,
    useValue: Conversation,
  },
];