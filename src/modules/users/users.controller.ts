import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('/user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  index() {
    return this.userService.index();
  }

  @Get('/:id')
  show(@Param('id') id: number) {
    return this.userService.show(id);
  }

  @Post('/post')
  post(@Body() createUserDto: CreateUserDto) {
    return this.userService.post(createUserDto);
  }

  @Put('/update/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
