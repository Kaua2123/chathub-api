import { Body, Inject, Injectable, Param } from '@nestjs/common';
import { MESSAGES_REPOSITORY } from 'src/constants';
import { Message } from './message.model';
import { CreateMessageDto } from './dtos/create-message-dto';

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

  async show(@Param('id') id: number) {
    const message = await this.messageModel.findByPk(id);

    return message;
  }

  async create(@Body() createMessageDto: CreateMessageDto) {
    const { content, ConversationId, UserId } = createMessageDto;

    const message = await this.messageModel.create({
      content,
      ConversationId,
      UserId,
    });

    return message;
  }

  async update(@Param('id') id: number, @Body() content: string) {
    const message = await this.messageModel.findByPk(id);

    const updatedMessage = await message.update({
      content,
    });

    return updatedMessage;
  }

  async delete(@Param('id') id: number) {
    const message = await this.messageModel.findByPk(id);

    await message.destroy();

    return null;
  }
}
