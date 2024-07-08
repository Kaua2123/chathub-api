import { Injectable } from '@nestjs/common';
import { ConversationsRepository } from './conversations-repository';
import { Conversation } from '../conversation.model';
import { ConversationsService } from '../conversations.service';
import { UpdateNameDto } from '../dto/UpdateNameDto';

@Injectable()
export class ConversationServiceRepository implements ConversationsRepository {
  constructor(private readonly conversationsService: ConversationsService) {}

  async getUserConversations(id: number): Promise<Conversation> {
    return this.conversationsService.getUserConversations(id);
  }

  async show(user_id: number, conversation_id: number): Promise<Conversation> {
    return this.conversationsService.show(user_id, conversation_id);
  }

  async addMoreUsersToConversation(
    conversation_id: number,
    user_id: number,
    ...users_id: number[]
  ): Promise<{ message: string; conversation: Conversation }> {
    return this.conversationsService.addMoreUsersToConversation(
      conversation_id,
      user_id,
      ...users_id,
    );
  }

  async removeUsersFromConversation(
    conversation_id: number,
    ...users_id: number[]
  ): Promise<{ message: string; conversation: Conversation }> {
    return this.conversationsService.removeUsersFromConversation(
      conversation_id,
      ...users_id,
    );
  }

  async create(
    user_creator_id: number,
    user_invited_id: number,
  ): Promise<{ message: string; conversation: Conversation }> {
    return this.conversationsService.create(user_creator_id, user_invited_id);
  }

  async updateNameFromConversation(
    conversation_id: number,
    updateNameDto: UpdateNameDto,
  ): Promise<Conversation> {
    return this.conversationsService.updateNameFromConversation(
      conversation_id,
      updateNameDto,
    );
  }

  async delete(id: number): Promise<void> {
    return this.conversationsService.delete(id);
  }
}
