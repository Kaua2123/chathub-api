import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('/getMessages/:id')
  async getMessagesOfAConversation(@Param('id') id: number) {
    return this.messagesService.getMessagesOfAConversation(id);
  }
}
