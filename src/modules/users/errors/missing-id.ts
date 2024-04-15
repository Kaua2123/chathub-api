import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingId extends HttpException {
  constructor() {
    super('Missing id.', HttpStatus.BAD_REQUEST);
  }
}
