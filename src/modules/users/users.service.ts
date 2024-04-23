import { Body, Param, Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserNotFound } from './errors/user-not-found';
import { MissingId } from './errors/missing-id';
import { USERS_REPOSITORY } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async index() {
    const users = await this.userModel.findAll();

    if (!users) throw new UserNotFound();

    return users;
  }

  async show(@Param() id: number) {
    const user = await this.userModel.findByPk(id);

    if (!user) throw new UserNotFound();

    return user;
  }

  async create(@Body() createUserDto: CreateUserDto) {
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

    if (!id) throw new MissingId();

    const user = await this.userModel.findByPk(id);

    if (!user) throw new UserNotFound();

    const updatedUser = await user.update({
      name,
      username,
      email,
      password,
    });

    return updatedUser;
  }

  async delete(@Param('id') id: number) {
    if (!id) throw new MissingId();

    const user = await this.userModel.findByPk(id);

    await user.destroy();
  }
}
