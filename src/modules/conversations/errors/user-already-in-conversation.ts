import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyInConversation extends HttpException {
  constructor() {
    super(
      'This user is already in the conversation.',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
