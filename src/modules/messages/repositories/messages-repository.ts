import { CreateMessageDto } from '../dtos/create-message-dto';
import { UpdateMessageDto } from '../dtos/update-message-dto';
import { Message } from '../message.model';

export abstract class MessagesRepository {
  abstract getMessagesOfAConversation(id: number): Promise<Message[]>;
  abstract getLastMessageOfAConversation(id: number): Promise<Message>;
  abstract getUnreadMessagesOfAConversation(id: number): Promise<Message[]>;
  abstract show(id: number): Promise<Message>;
  abstract create(createMessageDto: CreateMessageDto): Promise<Message>;

  abstract update(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message>;

  abstract delete(id: number): Promise<{ message: string }>;
}
