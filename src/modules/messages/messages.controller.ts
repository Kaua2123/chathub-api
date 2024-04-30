import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message-dto';

@Controller('/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('/getMessages/:id')
  async getMessagesOfAConversation(@Param('id') id: number) {
    return this.messagesService.getMessagesOfAConversation(id);
  }

  @Get('/show/:id')
  async show(@Param('id') id: number) {
    return this.messagesService.show(id);
  }

  @Post('/create')
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Put('/update/:id')
  async update(@Param('id') id: number, @Body() content: string) {
    return this.messagesService.update(id, content);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return this.messagesService.delete(id);
  }
}
