import { Inject, Injectable, Param } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/constants';
import { User } from '../users/user.model';

@Injectable()
export class FriendsService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async getUserFriends(@Param('id') id: number) {
    const user = await this.userModel.findByPk(id);

    const friends: User = await user.$get('friends' as keyof User, {
      attributes: ['username', 'image', 'is_online'],
    });

    return friends;
  }

  async delete(
    @Param('user_id') user_id: number,
    @Param('friend_id') friend_id: number,
  ) {
    const user = await this.userModel.findByPk(user_id);

    await user.$remove('friends', friend_id);
    await user.$remove('friendOf', friend_id);

    return {
      message: 'Você removeu este usuário de sua lista de amigos.',
    };
  }
}
