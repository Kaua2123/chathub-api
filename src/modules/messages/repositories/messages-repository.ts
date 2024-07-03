import { CreateMessageDto } from '../dtos/create-message-dto';
import { UpdateMessageDto } from '../dtos/update-message-dto';
import { Message } from '../message.model';

export abstract class MessagesRepository {
  abstract getMessagesOfAConversation(id: number): Promise<Message[]>;
  abstract getLastMessageOfAConversation(id: number): Promise<Message>;

  abstract hasUnreadMessagesOnAConversation(
    conversation_id: number,
    user_id: number,
  ): Promise<Message[]>;

  abstract hasUnreadMessagesInAGroup(
    conversation_id: number,
    ...users_id: number[]
  ): Promise<object[]>;

  abstract readUnreadMessagesOfAConversation(
    conversation_id: number,
    user_id: number,
  ): Promise<Message[]>;

  abstract show(id: number): Promise<Message>;
  abstract create(createMessageDto: CreateMessageDto): Promise<Message>;

  abstract update(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message>;

  abstract delete(id: number): Promise<{ message: string }>;
}
