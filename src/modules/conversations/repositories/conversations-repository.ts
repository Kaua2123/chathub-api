import { Conversation } from '../conversation.model';

export abstract class ConversationsRepository {
  abstract getUserConversations(id: number): Promise<Conversation>;
}
