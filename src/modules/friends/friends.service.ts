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

    const friends = await user.$get('friends' as keyof User);

    return friends;
  }
}
