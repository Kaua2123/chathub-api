import { Controller, Get, Param } from '@nestjs/common';
import { FriendsService } from './friends.service';

@Controller('/user')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get('/friends/:id')
  async getUserFriends(@Param('id') id: number) {
    return this.friendsService.getUserFriends(id);
  }
}
