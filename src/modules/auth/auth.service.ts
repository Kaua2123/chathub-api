import { Body, Inject, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import 'dotenv/config';
import { AuthUserDto } from './dto/auth-user-dto';
import { User } from '../users/user.model';
import { USERS_REPOSITORY } from 'src/constants';
import { PasswordsDoNotMatch } from '../users/errors/passwords-do-not-match';
import { UserNotFound } from '../users/errors/user-not-found';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async login(@Body() authUserDto: AuthUserDto) {
    const { email, password } = authUserDto;

    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new UserNotFound();

    const pass = await bcrypt.compare(password, user.password_hash);
    const { id, is_online } = user;

    if (!pass) throw new PasswordsDoNotMatch();

    const token = jwt.sign({ id, is_online }, process.env.TOKEN_KEY);
    return { token };
  }
}
