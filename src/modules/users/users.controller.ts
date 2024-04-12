import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('/user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  index() {
    return this.userService.index();
  }

  @Post('/post')
  post(@Body() createUserDto: CreateUserDto) {
    return this.userService.post(createUserDto);
  }
}
