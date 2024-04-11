import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserProtocol } from 'src/modules/users/contracts/user-protocol';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async index(): Promise<UserProtocol[]> {
    const user = await this.userModel.findAll();
    console.log(user);
    return user;
  }
}
