import { Body, Param, Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { USERS_REPOSITORY } from 'src/constants';
import { CreateUserDto } from './dto/create-user-dto';
import { UserRepository } from './repositories/users-repository';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService implements UserRepository {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async index() {
    const users = await this.userModel.findAll();
    return users;
  }

  async show(@Param() id: number) {
    const user = await this.userModel.findByPk(id);

    return user;
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

  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const { name, username, email, password } = updateUserDto;

    const user = await this.userModel.findByPk(id);

    const updatedUser = await user.update({
      name,
      username,
      email,
      password,
    });

    return updatedUser;
  }
  delete() {}
}
