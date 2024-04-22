import { Controller, Get, Param } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';

@Controller('/friendRequest')
export class FriendRequestsController {
  constructor(private readonly friendRequestsService: FriendRequestsService) {}

  @Get('/')
  async index() {
    await this.friendRequestsService.index();
  }

  @Get('/')
  async show(@Param('id') id: number) {
    await this.friendRequestsService.show(id);
  }
}
