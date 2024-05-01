import { Inject, Injectable, Param } from '@nestjs/common';
import { BLOCKED_USERS_REPOSITORY, USERS_REPOSITORY } from 'src/constants';
import { BlockedUsers } from './blocked-users.model';
import { User } from '../users/user.model';

@Injectable()
export class BlockedUsersService {
  constructor(
    @Inject(BLOCKED_USERS_REPOSITORY)
    private readonly blockedUserModel: typeof BlockedUsers,
    @Inject(USERS_REPOSITORY)
    private readonly userModel: typeof User,
  ) {}

  async blockUserById(@Param('id') id: number) {
    const user = await this.userModel.findByPk(id);

    const blockedUser = await this.blockedUserModel.create({
      UserId: user.id,
    });

    return {
      message: `Você bloqueou ${user.username}.`,
      blockedUser,
    };
  }
}
