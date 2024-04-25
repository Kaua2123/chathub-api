import { User } from 'src/modules/users/user.model';
import { FriendsRepository } from './friends-repository';
import { FriendsService } from '../friends.service';

export class FriendsServiceRepository implements FriendsRepository {
  constructor(private readonly friendsService: FriendsService) {}

  getUserFriends(id: number): Promise<User> {
    return this.friendsService.getUserFriends(id);
  }

  delete(user_id: number, friend_id: number): Promise<{ message: string }> {
    return this.friendsService.delete(user_id, friend_id);
  }
}
