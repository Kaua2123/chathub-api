import { HttpException, HttpStatus } from '@nestjs/common';

export class MessageNotFound extends HttpException {
  constructor() {
    super('Message(s) not found.', HttpStatus.NOT_FOUND);
  }
}
