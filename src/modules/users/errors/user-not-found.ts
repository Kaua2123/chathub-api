import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFound extends HttpException {
  constructor() {
    super('User(s) not found.', HttpStatus.NOT_FOUND);
  }
}
