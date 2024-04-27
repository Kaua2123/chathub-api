import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendsNotFound extends HttpException {
  constructor() {
    super('Friend(s) not found.', HttpStatus.NOT_FOUND);
  }
}
