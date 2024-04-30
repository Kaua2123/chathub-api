import { HttpException, HttpStatus } from '@nestjs/common';

export class ConversationNotFound extends HttpException {
  constructor() {
    super('Conversation(s) not found.', HttpStatus.NOT_FOUND);
  }
}
