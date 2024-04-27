import { Inject, Injectable, Param } from '@nestjs/common';
import { User } from '../users/user.model';
import { UserNotFound } from '../users/errors/user-not-found';
import { FriendsNotFound } from './errors/friends-not-found';
import { USERS_REPOSITORY } from 'src/constants';
import { MissingId } from '../users/errors/missing-id';

@Injectable()
export class FriendsService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async getUserFriends(@Param('id') id: number) {
    if (!id) throw new MissingId();

    const user = await this.userModel.findByPk(id);

    if (!user) throw new UserNotFound();

    const friends = await this.userModel.findAll({
      where: { id },
      attributes: ['username', 'image', 'is_online'],
    });

    if (!friends) throw new FriendsNotFound();

    return friends;
  }

  async delete(
    @Param('user_id') user_id: number,
    @Param('friend_id') friend_id: number,
  ) {
    if (!user_id || !friend_id) throw new MissingId();

    const user = await this.userModel.findByPk(user_id);
    if (!user) throw new UserNotFound();

    await user.$remove('friends', friend_id);
    await user.$remove('friendOf', friend_id);

    return {
      message: 'Você removeu este usuário de sua lista de amigos.',
    };
  }
}
