import { Body, Inject, Injectable, Param } from '@nestjs/common';
import { MESSAGES_REPOSITORY, NOTIFICATIONS_REPOSITORY } from 'src/constants';
import { Message } from './message.model';
import { CreateMessageDto } from './dtos/create-message-dto';
import { UpdateMessageDto } from './dtos/update-message-dto';
import { MessageNotFound } from './errors/message-not-found';
import { Notification } from '../notifications/notification.model';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(MESSAGES_REPOSITORY)
    private messageModel: typeof Message,
    @Inject(NOTIFICATIONS_REPOSITORY)
    private notificationModel: typeof Notification,
  ) {}

  async getMessagesOfAConversation(@Param('id') id: number) {
    const messages = await this.messageModel.findAll({
      where: { ConversationId: id },
    });

    if (!messages) throw new MessageNotFound();

    return messages;
  }

  async getLastMessageOfAConversation(@Param('id') id: number) {
    const messages = await this.messageModel.findAll({
      where: { ConversationId: id },
    });

    if (!messages) throw new MessageNotFound();

    const indexOfLastMessage = messages.length - 1;
    const lastMessage = messages[indexOfLastMessage];

    return lastMessage;
  }

  async hasUnreadMessagesOnAConversation(
    @Param('conversation_id') conversation_id: number,
    @Param('user_id') user_id: number,
  ) {
    const messages = await this.messageModel.findAll({
      where: {
        ConversationId: conversation_id,
      },
    });

    if (!messages) throw new MessageNotFound();

    const unreadMessages = messages.filter(
      (message) => !message.is_read_by.includes(user_id.toString()),
    );

    if (!unreadMessages) return [];

    return unreadMessages;
  }

  async readAllUnreadMessagesOfAConversation(
    @Param('conversation_id') conversation_id: number,
    @Param('user_id') user_id: number,
  ) {
    const messages = await this.messageModel.findAll({
      where: {
        ConversationId: conversation_id,
      },
    });

    messages.map(async (message) => {
      const replaced = message.is_read_by.replaceAll('"', '');
      const read_by_array = replaced.split(',');

      if (read_by_array.includes(user_id.toString()))
        return 'Messages are already read';

      read_by_array.push(user_id.toString());

      const read_by_string = read_by_array.toString();

      await message.update({
        is_read_by: read_by_string,
      });
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
    const { content, is_sender, is_read_by, ConversationId, UserId } =
      createMessageDto;

    const message = await this.messageModel.create({
      content,
      is_sender,
      is_read_by,
      ConversationId,
      UserId,
    });

    // aletar o usuario de novas mensgens DO OUTRO USUARIO

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
      is_updated: updateMessageDto.is_updated,
      is_deleted: updateMessageDto.is_deleted,
    });

    return updatedMessage;
  }

  async delete(@Param('id') id: number) {
    const message = await this.messageModel.findByPk(id);

    if (!message) throw new MessageNotFound();

    await message.destroy();

    return {
      message: 'null',
    };
  }
}
