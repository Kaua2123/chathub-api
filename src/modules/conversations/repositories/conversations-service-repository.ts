import { Injectable } from '@nestjs/common';
import { ConversationsRepository } from './conversations-repository';
import { Conversation } from '../conversation.model';
import { ConversationsService } from '../conversations.service';

@Injectable()
export class ConversationServiceRepository implements ConversationsRepository {
  constructor(private readonly conversationsService: ConversationsService) {}

  getUserConversations(id: number): Promise<Conversation> {
    return this.conversationsService.getUserConversations(id);
  }

  addMoreUsersToConversation(
    conversation_id: number,
    ...users_id: number[]
  ): Promise<{ message: string; conversation: Conversation }> {
    return this.conversationsService.addMoreUsersToConversation(
      conversation_id,
      ...users_id,
    );
  }

  removeUsersFromConversation(
    conversation_id: number,
    ...users_id: number[]
  ): Promise<{ message: string; conversation: Conversation }> {
    return this.conversationsService.removeUsersFromConversation(
      conversation_id,
      ...users_id,
    );
  }

  create(
    user_creator_id: number,
    user_invited_id: number,
  ): Promise<{ message: string; conversation: Conversation }> {
    return this.conversationsService.create(user_creator_id, user_invited_id);
  }

  delete(id: number): Promise<void> {
    return this.conversationsService.delete(id);
  }
}
