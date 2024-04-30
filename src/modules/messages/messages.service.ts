import { Inject, Injectable, Param } from '@nestjs/common';
import { MESSAGES_REPOSITORY } from 'src/constants';
import { Message } from './message.model';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(MESSAGES_REPOSITORY)
    private messageModel: typeof Message,
  ) {}

  async getMessagesOfAConversation(@Param('id') id: number) {
    const messages = await this.messageModel.findAll({
      where: { ConversationId: id },
    });

    return messages;
  }
}
