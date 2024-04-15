import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthRequired implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];

    if (!token)
      throw new HttpException(
        'You must be authenticated.',
        HttpStatus.UNAUTHORIZED,
      );

    next();
  }
}
