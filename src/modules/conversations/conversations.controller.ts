import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ConversationsRepository } from './repositories/conversations-repository';
import { UpdateNameDto } from './dto/UpdateNameDto';

@Controller('/conversation')
export class ConversationsController {
  constructor(
    private readonly conversationsRepository: ConversationsRepository,
  ) {}

  @Get('/:id')
  async getUserConversations(@Param('id') id: number) {
    return this.conversationsRepository.getUserConversations(id);
  }

  @Get('/show/:user_id/:conversation_id')
  async show(
    @Param('user_id') user_id: number,
    @Param('conversation_id') conversation_id: number,
  ) {
    return this.conversationsRepository.show(user_id, conversation_id);
  }

  @Post('/create/:user_creator_id/:user_invited_id')
  async create(
    @Param('user_creator_id') user_creator_id: number,
    @Param('user_invited_id') user_invited_id: number,
  ) {
    return this.conversationsRepository.create(
      user_creator_id,
      user_invited_id,
    );
  }

  @Post('/addMoreUsersToConversation/:conversation_id/:user_id/:users_id')
  async addMoreUsersToConversation(
    @Param('conversation_id') conversation_id: number,
    @Param('user_id') user_id: number,
    @Param('users_id') users_id: number[],
  ) {
    return this.conversationsRepository.addMoreUsersToConversation(
      conversation_id,
      user_id,
      ...users_id,
    );
  }

  @Delete('/removeUsersFromConversation/:conversation_id/:users_id')
  async removeUsersFromConversation(
    @Param('conversation_id') conversation_id: number,
    @Param('users_id') users_id: number[],
  ) {
    return this.conversationsRepository.removeUsersFromConversation(
      conversation_id,
      ...users_id,
    );
  }

  @Put('/updateName/:conversation_id')
  async updateNameFromConversation(
    @Param('conversation_id') conversation_id: number,
    @Body() updateNameDto: UpdateNameDto,
  ) {
    return this.conversationsRepository.updateNameFromConversation(
      conversation_id,
      updateNameDto,
    );
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return this.conversationsRepository.delete(id);
  }
}
