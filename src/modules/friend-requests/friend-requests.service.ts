import { Inject, Injectable, Param } from '@nestjs/common';
import { FRIEND_REQUESTS_REPOSITORY, USERS_REPOSITORY } from 'src/constants';
import { FriendRequests } from './friend-requests.model';
import { User } from '../users/user.model';

@Injectable()
export class FriendRequestsService {
  constructor(
    @Inject(FRIEND_REQUESTS_REPOSITORY)
    private friendRequestModel: typeof FriendRequests,
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async index() {
    const friendRequests = await this.friendRequestModel.findAll({
      attributes: ['id', 'UserId', 'message', 'createdAt', 'updatedAt'],
      include: {
        model: User,
        attributes: ['id', 'username'],
      },
    });

    return friendRequests;
  }

  async show(@Param('id') id: number) {
    const friendRequest = await this.friendRequestModel.findByPk(id);

    return friendRequest;
  }

  async create(@Param('user_id') user_id: number) {
    // preciso do id do usuario que enviou.

    const user = await this.userModel.findByPk(user_id);

    const newFriendRequest = await this.friendRequestModel.create({
      message: `${user.username} te enviou um pedido de amizade`,
      UserId: user.id,
    });

    return newFriendRequest;
  }
}
