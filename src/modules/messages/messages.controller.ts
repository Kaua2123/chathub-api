import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message-dto';
import { UpdateMessageDto } from './dtos/update-message-dto';
import { MessagesRepository } from './repositories/messages-repository';

@Controller('/messages')
export class MessagesController {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  @Get('/getMessages/:id')
  async getMessagesOfAConversation(@Param('id') id: number) {
    return this.messagesRepository.getMessagesOfAConversation(id);
  }

  @Get('/getLastMessage/:id')
  async getLastMessageOfAConversation(@Param('id') id: number) {
    return this.messagesRepository.getLastMessageOfAConversation(id);
  }

  @Get('/getUnreadMessages/:conversation_id/:user_id')
  async hasUnreadMessagesOnAConversation(
    @Param('conversation_id') conversation_id: number,
    @Param('user_id') user_id: number,
  ) {
    return this.messagesRepository.hasUnreadMessagesOnAConversation(
      conversation_id,
      user_id,
    );
  }

  @Get('/show/:id')
  async show(@Param('id') id: number) {
    return this.messagesRepository.show(id);
  }

  @Post('/create')
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesRepository.create(createMessageDto);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesRepository.update(id, updateMessageDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return this.messagesRepository.delete(id);
  }
}
