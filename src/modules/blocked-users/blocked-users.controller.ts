import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BlockedUsersService } from './blocked-users.service';
import { BlockUserDto } from './dto/block-user-dto';

@Controller('/blockedUsers')
export class BlockedUsersController {
  constructor(private readonly blockedUsersService: BlockedUsersService) {}

  @Post('/blockUser/:id')
  async blockUserById(
    @Param('id') id: number,
    @Body() blockUserDto: BlockUserDto,
  ) {
    return this.blockedUsersService.blockUserById(id, blockUserDto);
  }

  @Delete('/unblockUser/:id')
  async unblockUserById(@Param('id') id: number) {
    return this.blockedUsersService.unblockUserById(id);
  }
}
