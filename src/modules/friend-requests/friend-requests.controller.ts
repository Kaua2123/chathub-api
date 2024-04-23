import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { SendFriendRequestDto } from './dto/send-friend-request-dto';

@Controller('/friendRequest')
export class FriendRequestsController {
  constructor(private readonly friendRequestsService: FriendRequestsService) {}

  @Get('/:user_id')
  async index(@Param('user_id') user_id) {
    return this.friendRequestsService.listUserFriendRequests(user_id);
  }

  @Get('/show/:id')
  async show(@Param('id') id: number) {
    return this.friendRequestsService.show(id);
  }

  @Post('/create')
  async create(@Body() sendFriendRequestDto: SendFriendRequestDto) {
    return this.friendRequestsService.create(sendFriendRequestDto);
  }

  @Delete('/rejectFriendRequest/:id')
  async rejectFriendRequest(@Param('id') id: number) {
    return this.friendRequestsService.rejectFriendRequest(id);
  }

  @Post('/acceptFriendRequest/:id')
  async acceptFriendRequest(@Param('id') id: number) {
    return this.friendRequestsService.acceptFriendRequest(id);
  }
}
