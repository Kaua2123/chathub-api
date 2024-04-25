import { User } from 'src/modules/users/user.model';

export abstract class FriendsRepository {
  abstract getUserFriends(id: number): Promise<User>;
  abstract delete(
    user_id: number,
    friend_id: number,
  ): Promise<{ message: string }>;
}
