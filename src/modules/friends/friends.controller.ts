import { Controller, Get, Param } from '@nestjs/common';
import { FriendsRepository } from './repositories/friends-repository';

@Controller('/user')
export class FriendsController {
  constructor(private readonly friendsRepository: FriendsRepository) {}

  @Get('/friends/:id')
  async getUserFriends(@Param('id') id: number) {
    return this.friendsRepository.getUserFriends(id);
  }

  @Get('/removeFriends/:user_id/:friend_id')
  async delete(
    @Param('user_id') user_id: number,
    @Param('friend_id') friend_id: number,
  ) {
    return this.friendsRepository.delete(user_id, friend_id);
  }
}
