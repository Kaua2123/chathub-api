import { User } from 'src/modules/users/user.model';
import { FriendsRepository } from './friends-repository';
import { FriendsService } from '../friends.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendsServiceRepository implements FriendsRepository {
  constructor(private readonly friendsService: FriendsService) {}

  async getUserFriends(id: number): Promise<User[]> {
    console.log(this.friendsService); // undefined
    return this.friendsService.getUserFriends(id);
  }

  async delete(
    user_id: number,
    friend_id: number,
  ): Promise<{ message: string }> {
    return this.friendsService.delete(user_id, friend_id);
  }
}
