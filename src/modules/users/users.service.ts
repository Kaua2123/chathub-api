import { Body, Param, Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { USERS_REPOSITORY } from 'src/constants';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersRepository } from './repositories/users-repository';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService implements UsersRepository {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async index() {
    try {
      const users = await this.userModel.findAll();
      return users;
    } catch (error) {
      return error;
    }
  }

  async show(@Param() id: number) {
    try {
      const user = await this.userModel.findByPk(id);

      return user;
    } catch (error) {
      return error;
    }
  }

  async post(@Body() createUserDto: CreateUserDto) {
    try {
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
    } catch (error) {
      return error;
    }
  }

  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const { name, username, email, password } = updateUserDto;

      const user = await this.userModel.findByPk(id);

      const updatedUser = await user.update({
        name,
        username,
        email,
        password,
      });

      return updatedUser;
    } catch (error) {
      return error;
    }
  }
  delete() {}
}
