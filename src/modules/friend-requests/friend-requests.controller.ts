import { Controller, Get, Param, Post } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';

@Controller('/friendRequest')
export class FriendRequestsController {
  constructor(private readonly friendRequestsService: FriendRequestsService) {}

  @Get('/')
  async index() {
    return this.friendRequestsService.index();
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    return this.friendRequestsService.show(id);
  }

  @Post('/create/:user_id')
  async sendFriendRequest(@Param('user_id') user_id: number) {
    return this.friendRequestsService.create(user_id);
  }
}
