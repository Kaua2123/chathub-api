import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('/conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('/:id')
  async getUserConversations(@Param('id') id: number) {
    return this.conversationService.getUserConversations(id);
  }

  @Post('/create/:user_creator_id/:user_invited_id')
  async create(
    @Param('user_creator_id') user_creator_id: number,
    @Param('user_invited_id') user_invited_id: number,
  ) {
    return this.conversationService.create(user_creator_id, user_invited_id);
  }

  @Post('/addMoreUsersToConversation/:conversation_id/:users_id')
  async addMoreUsersToConversation(
    @Param('conversation_id') conversation_id: number,
    @Param('users_id') users_id: number[],
  ) {
    return this.conversationService.addMoreUsersToConversation(
      conversation_id,
      ...users_id,
    );
  }

  @Delete('/removeUsersFromConversation/:conversation_id/:users_id')
  async removeUsersFromConversation(
    @Param('conversation_id') conversation_id: number,
    @Param('users_id') users_id: number[],
  ) {
    return this.conversationService.removeUsersFromConversation(
      conversation_id,
      ...users_id,
    );
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return this.conversationService.delete(id);
  }
}
