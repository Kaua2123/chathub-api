import { Controller, Param, Post } from '@nestjs/common';
import { BlockedUsersService } from './blocked-users.service';

@Controller('/blockedUsers')
export class BlockedUsersController {
  constructor(private readonly blockedUsersService: BlockedUsersService) {}

  @Post('/blockUser/:id')
  async blockUserById(@Param('id') id: number) {
    return this.blockedUsersService.blockUserById(id);
  }
}
