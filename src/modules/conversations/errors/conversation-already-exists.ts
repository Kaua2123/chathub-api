import { HttpException, HttpStatus } from '@nestjs/common';

export class ConversationAlreadyExists extends HttpException {
  constructor() {
    super(
      'You cannot create a conversation that already exists.',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
