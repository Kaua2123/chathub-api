import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyFriends extends HttpException {
  constructor() {
    super(
      'You and this user are already friends.',
      HttpStatus.PRECONDITION_FAILED,
    );
  }
}
