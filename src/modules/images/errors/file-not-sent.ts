import { HttpException, HttpStatus } from '@nestjs/common';

export class FileNotSent extends HttpException {
  constructor() {
    super('File not sent.', HttpStatus.NOT_FOUND);
  }
}
