import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotSendFriendRequestToYourself extends HttpException {
  constructor() {
    super(
      'You cannot send friend request to yourself. ',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
