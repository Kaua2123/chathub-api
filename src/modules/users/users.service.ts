import { Body, Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { USERS_REPOSITORY } from 'src/constants';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async index() {
    const users = await this.userModel.findAll();
    return users;
  }

  async post(@Body() createUserDto: CreateUserDto) {
    const { id, name, username, email, password, isOnline } = createUserDto;

    const user = await this.userModel.create({
      id,
      name,
      username,
      email,
      password,
      isOnline,
    });

    return user;
  }
}
