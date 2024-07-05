import { Conversation } from '../conversation.model';
import { UpdateNameDto } from '../dto/UpdateNameDto';

export abstract class ConversationsRepository {
  abstract getUserConversations(id: number): Promise<Conversation>;
  abstract show(
    user_id: number,
    conversation_id: number,
  ): Promise<Conversation>;

  abstract create(
    user_creator_id: number,
    user_invited_id: number,
  ): Promise<{ message: string; conversation: Conversation }>;

  abstract addMoreUsersToConversation(
    conversation_id: number,
    ...users_id: number[]
  ): Promise<{
    message: string;
    conversation: Conversation;
  }>;

  abstract removeUsersFromConversation(
    conversation_id: number,
    ...users_id: number[]
  ): Promise<{
    message: string;
    conversation: Conversation;
  }>;

  abstract updateNameFromConversation(
    conversation_id: number,
    updateNameDto: UpdateNameDto,
  ): Promise<Conversation>;

  abstract delete(id: number): Promise<void>;
}
