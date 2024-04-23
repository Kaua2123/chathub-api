import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersRepository } from './repositories/users-repository';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get('/')
  async index() {
    return this.usersRepository.index();
  }

  @Post('/create')
  async post(@Body() createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    return this.usersRepository.show(id);
  }

  @Put('/update/:id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return this.usersRepository.delete(id);
  }
}
