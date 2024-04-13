import {
  Body,
  Param,
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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

      if (!users)
        throw new HttpException('Users not found', HttpStatus.NOT_FOUND);

      return users;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async show(@Param() id: number) {
    try {
      const user = await this.userModel.findByPk(id);

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      return user;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const { name, username, email, password } = updateUserDto;

      if (!id) throw new HttpException('Missing ID', HttpStatus.BAD_REQUEST);

      const user = await this.userModel.findByPk(id);

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const updatedUser = await user.update({
        name,
        username,
        email,
        password,
      });

      return updatedUser;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  delete() {}
}
