import { Body, Inject, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import 'dotenv/config';
import { AuthUserDto } from './dto/auth-user-dto';
import { User } from '../users/user.model';
import { USERS_REPOSITORY } from 'src/constants';
import { PasswordsDoNotMatch } from '../users/errors/passwords-do-not-match';

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

    const pass = await bcrypt.compare(password, user.password_hash);
    const { id } = user;

    if (!pass) throw new PasswordsDoNotMatch();

    const token = jwt.sign({ id }, process.env.TOKEN_KEY);
    return { token };
  }
}
