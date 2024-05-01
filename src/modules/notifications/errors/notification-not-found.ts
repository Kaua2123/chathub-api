import { HttpException, HttpStatus } from '@nestjs/common';

export class NotificationNotFound extends HttpException {
  constructor() {
    super('Notification(s) not found', HttpStatus.NOT_FOUND);
  }
}
