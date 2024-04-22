import { Inject, Injectable, Param } from '@nestjs/common';
import { FRIEND_REQUESTS_REPOSITORY } from 'src/constants';
import { FriendRequests } from './friend-requests.model';

@Injectable()
export class FriendRequestsService {
  constructor(
    @Inject(FRIEND_REQUESTS_REPOSITORY)
    private friendRequestModel: typeof FriendRequests,
  ) {}

  async index() {
    const friendRequests = await this.friendRequestModel.findAll();

    return friendRequests;
  }

  async show(@Param('id') id: number) {
    const friendRequest = await this.friendRequestModel.findByPk(id);

    return friendRequest;
  }
}
