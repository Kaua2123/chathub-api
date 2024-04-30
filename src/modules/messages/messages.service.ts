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

  async create(
    content: string,
    @Param('conversation_id') conversation_id: number,
    @Param('user_id') user_id: number,
  ) {
    const message = await this.messageModel.create({
      content,
      ConversationId: conversation_id,
      UserId: user_id,
    });

    return message;
  }
}
