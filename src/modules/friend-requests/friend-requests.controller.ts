import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SendFriendRequestDto } from './dto/send-friend-request-dto';
import { FriendRequestsRepository } from './repositories/friend-requests-repository';

@Controller('/friendRequest')
export class FriendRequestsController {
  constructor(private friendRequestsRepository: FriendRequestsRepository) {}

  @Get('/:user_id')
  async listUserFriendRequests(@Param('user_id') user_id: number) {
    return this.friendRequestsRepository.listUserFriendRequests(user_id);
  }

  @Get('/show/:id')
  async show(@Param('id') id: number) {
    return this.friendRequestsRepository.show(id);
  }

  @Post('/create')
  async create(@Body() sendFriendRequestDto: SendFriendRequestDto) {
    return this.friendRequestsRepository.create(sendFriendRequestDto);
  }

  @Delete('/rejectFriendRequest/:id')
  async rejectFriendRequest(@Param('id') id: number) {
    return this.friendRequestsRepository.rejectFriendRequest(id);
  }

  @Post('/acceptFriendRequest/:id')
  async acceptFriendRequest(@Param('id') id: number) {
    return this.friendRequestsRepository.acceptFriendRequest(id);
  }
}
