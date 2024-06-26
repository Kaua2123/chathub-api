import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedToViewMessage extends HttpException {
  constructor() {
    super(
      'Ocurred an error when trying to view the messages.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
