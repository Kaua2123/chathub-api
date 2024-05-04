import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyBlocked extends HttpException {
  constructor() {
    super('User already blocked.', HttpStatus.NOT_ACCEPTABLE);
  }
}
