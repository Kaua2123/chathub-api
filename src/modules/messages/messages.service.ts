import { Body, Inject, Injectable, Param } from '@nestjs/common';
import { MESSAGES_REPOSITORY } from 'src/constants';
import { Message } from './message.model';
import { CreateMessageDto } from './dtos/create-message-dto';
import { UpdateMessageDto } from './dtos/update-message-dto';
import { MessageNotFound } from './errors/message-not-found';

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

    if (!messages) throw new MessageNotFound();

    return messages;
  }

  async show(@Param('id') id: number) {
    const message = await this.messageModel.findByPk(id);

    if (!message) throw new MessageNotFound();

    return message;
  }

  async create(@Body() createMessageDto: CreateMessageDto) {
    const { content, ConversationId, UserId } = createMessageDto;

    const message = await this.messageModel.create({
      content,
      ConversationId,
      UserId,
    });

    if (!message) throw new MessageNotFound();

    return message;
  }

  async update(
    @Param('id') id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    const message = await this.messageModel.findByPk(id);

    if (!message) throw new MessageNotFound();

    const updatedMessage = await message.update({
      content: updateMessageDto.content,
    });

    return updatedMessage;
  }

  async delete(@Param('id') id: number) {
    const message = await this.messageModel.findByPk(id);

    if (!message) throw new MessageNotFound();

    await message.destroy();

    return null;
  }
}
