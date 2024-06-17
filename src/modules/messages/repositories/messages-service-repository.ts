import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../dtos/create-message-dto';
import { UpdateMessageDto } from '../dtos/update-message-dto';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import { MessagesRepository } from './messages-repository';

@Injectable()
export class MessagesServiceRepository implements MessagesRepository {
  constructor(private readonly messagesService: MessagesService) {}

  getMessagesOfAConversation(id: number): Promise<Message[]> {
    return this.messagesService.getMessagesOfAConversation(id);
  }

  getLastMessageOfAConversation(id: number): Promise<Message> {
    return this.messagesService.getLastMessageOfAConversation(id);
  }

  hasUnreadMessagesOnAConversation(
    id: number,
    user_id: number,
  ): Promise<Message[]> {
    return this.messagesService.hasUnreadMessagesOnAConversation(id, user_id);
  }

  show(id: number): Promise<Message> {
    return this.messagesService.show(id);
  }

  create(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
    return this.messagesService.update(id, updateMessageDto);
  }

  delete(id: number): Promise<{ message: string }> {
    return this.messagesService.delete(id);
  }
}
