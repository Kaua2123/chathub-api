import { HttpException, HttpStatus } from '@nestjs/common';

export class NotAllowed extends HttpException {
  constructor() {
    super(
      'Action not allowed, you are blocked by this user.',
      HttpStatus.METHOD_NOT_ALLOWED,
    );
  }
}
