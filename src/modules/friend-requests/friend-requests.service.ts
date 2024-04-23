import { Body, Inject, Injectable, Param } from '@nestjs/common';
import {
  FRIENDS_REPOSITORY,
  FRIEND_REQUESTS_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/constants';
import { FriendRequest } from './friend-request.model';
import { SendFriendRequestDto } from './dto/send-friend-request-dto';
import { Friend } from '../friends/friend.model';
import { User } from '../users/user.model';

@Injectable()
export class FriendRequestsService {
  constructor(
    @Inject(FRIEND_REQUESTS_REPOSITORY)
    private friendRequestModel: typeof FriendRequest,
    @Inject(FRIENDS_REPOSITORY)
    private friendsModel: typeof Friend,
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async listUserFriendRequests(@Param('user_id') user_id: number) {
    const friendRequests = await this.friendRequestModel.findAll({
      attributes: [
        'id',
        'senderId',
        'receiverId',
        'message',
        'status',
        'createdAt',
        'updatedAt',
      ],
      where: { receiverId: user_id },
    });

    return friendRequests;
  }

  async show(@Param('id') id: number) {
    const friendRequest = await this.friendRequestModel.findByPk(id, {
      attributes: [
        'id',
        'senderId',
        'receiverId',
        'message',
        'status',
        'createdAt',
        'updatedAt',
      ],
    });

    return friendRequest;
  }

  async create(@Body() sendFriendRequestDto: SendFriendRequestDto) {
    const { id, senderId, receiverId } = sendFriendRequestDto;

    const user = await this.userModel.findByPk(senderId);

    const friendRequest = await this.friendRequestModel.create({
      id,
      senderId,
      receiverId,
      message: `Você recebeu um pedido de amizade de ${user.username}`,
    });

    return friendRequest;
  }

  async rejectFriendRequest(@Param('id') id: number) {
    const friendRequest = await this.friendRequestModel.findByPk(id);

    await friendRequest.destroy();

    return {
      message: 'Você rejeitou o pedido de amizade.',
    };
  }

  async acceptFriendRequest(@Param('id') id: number) {
    const friendRequest = await this.friendRequestModel.findByPk(id);

    await friendRequest.update(
      { status: 'Accepted' },
      { where: { status: 'Pending' } },
    );

    const userWhoSent = await this.userModel.findByPk(friendRequest.senderId);
    const { username, is_online } = userWhoSent;

    const newFriend = await this.friendsModel.create({
      username,
      is_online,
    });

    return {
      message: `Pedido de amizade aceito. Você e ${username} agora são amigos.`,
      newFriend,
    };
  }
}
