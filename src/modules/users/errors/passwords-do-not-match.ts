import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordsDoNotMatch extends HttpException {
  constructor() {
    super('Passwords do not match.', HttpStatus.BAD_REQUEST);
  }
}
