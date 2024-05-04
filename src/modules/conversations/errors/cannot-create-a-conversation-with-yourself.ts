import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotCreateAConversationWithYourself extends HttpException {
  constructor() {
    super(
      'You cannot create a conversation with yourself.',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
