import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BlockUserDto } from './dto/block-user-dto';
import { BlockedUsersRepository } from './repositories/blocked-users-repository';

@Controller('/blockedUsers')
export class BlockedUsersController {
  constructor(
    private readonly blockedUsersRepository: BlockedUsersRepository,
  ) {}

  @Post('/blockUser/:id')
  async blockUserById(
    @Param('id') id: number,
    @Body() blockUserDto: BlockUserDto,
  ) {
    return this.blockedUsersRepository.blockUserById(id, blockUserDto);
  }

  @Delete('/unblockUser/:id')
  async unblockUserById(@Param('id') id: number) {
    return this.blockedUsersRepository.unblockUserById(id);
  }
}
