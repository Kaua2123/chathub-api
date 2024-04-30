import { Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('/getMessages/:id')
  async getMessagesOfAConversation(@Param('id') id: number) {
    return this.messagesService.getMessagesOfAConversation(id);
  }

  @Post('/create')
  async create(
    content: string,
    @Param('conversation_id') conversation_id: number,
    @Param('user_id') user_id: number,
  ) {
    return this.messagesService.create(content, conversation_id, user_id);
  }
}
