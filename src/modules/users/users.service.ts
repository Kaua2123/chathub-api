import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { UserProtocol } from 'src/modules/users/contracts/user-protocol';
import { USERS_REPOSITORY } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async index(): Promise<UserProtocol[]> {
    const user = await this.userModel.findAll();
    console.log(user);
    return user;
  }
}
