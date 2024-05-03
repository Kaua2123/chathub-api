import { HttpException, HttpStatus } from '@nestjs/common';

export class NotAllowed extends HttpException {
  constructor() {
    super(
      'Action not allowed, you are blocked or have been blocked this user.',
      HttpStatus.METHOD_NOT_ALLOWED,
    );
  }
}
