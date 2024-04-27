import { Controller, Get, Param } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('/conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('/:id')
  async getUserConversations(@Param('id') id: number) {
    return this.conversationService.getUserConversations(id);
  }
}
