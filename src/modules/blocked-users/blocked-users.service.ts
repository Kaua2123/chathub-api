import { Body, Inject, Injectable, Param } from '@nestjs/common';
import { BLOCKED_USERS_REPOSITORY, USERS_REPOSITORY } from 'src/constants';
import { BlockedUsers } from './blocked-users.model';
import { User } from '../users/user.model';
import { BlockUserDto } from './dto/block-user-dto';
import { UserNotFound } from '../users/errors/user-not-found';
import { CannotBlockYourself } from './errors/cannot-block-yourself';
import { UserAlreadyBlocked } from './errors/user-already-blocked';

@Injectable()
export class BlockedUsersService {
  constructor(
    @Inject(BLOCKED_USERS_REPOSITORY)
    private readonly blockedUserModel: typeof BlockedUsers,
    @Inject(USERS_REPOSITORY)
    private readonly userModel: typeof User,
  ) {}

  async blockUserById(
    @Param('id') id: number,
    @Body() blockUserDto: BlockUserDto,
  ) {
    const user = await this.userModel.findByPk(id);

    if (!user) throw new UserNotFound();
    if (blockUserDto.user_who_blocked_id == id) throw new CannotBlockYourself();

    const isUserAlreadyBlocked = await this.blockedUserModel.findOne({
      where: {
        user_who_blocked_id: blockUserDto.user_who_blocked_id,
        UserId: user.id,
      },
    });

    if (isUserAlreadyBlocked) throw new UserAlreadyBlocked();

    const blockedUser = await this.blockedUserModel.create({
      user_who_blocked_id: blockUserDto.user_who_blocked_id,
      UserId: user.id,
    });

    return {
      message: `Você bloqueou ${user.username}.`,
      blockedUser,
    };
  }

  async unblockUserById(@Param('id') id: number) {
    const user = await this.userModel.findByPk(id);

    const blockedUser = await this.blockedUserModel.findOne({
      where: { UserId: id },
    });

    await blockedUser.destroy();

    return {
      message: `Você desbloqueou ${user.username}.`,
    };
  }
}
