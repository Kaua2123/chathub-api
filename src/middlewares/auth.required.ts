import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthRequired implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('middleware AuthRequired called.');
    // const authorization = req.headers.authorization;

    // console.log(authorization);

    next();
  }
}
