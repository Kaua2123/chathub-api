import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProtocol } from 'src/modules/users/contracts/user-protocol';

@Controller('/')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  index(): Promise<UserProtocol[]> {
    return this.userService.index();
  }
}
