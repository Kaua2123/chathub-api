import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotBlockYourself extends HttpException {
  constructor() {
    super('You cannot block yourself.', HttpStatus.METHOD_NOT_ALLOWED);
  }
}
