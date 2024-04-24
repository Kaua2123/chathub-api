import { Body, Inject, Injectable, Param } from '@nestjs/common';

import { FRIEND_REQUESTS_REPOSITORY, USERS_REPOSITORY } from 'src/constants';

import { FriendRequest } from './friend-request.model';
import { SendFriendRequestDto } from './dto/send-friend-request-dto';
import { User } from '../users/user.model';

import { MissingId } from '../users/errors/missing-id';
import { FriendRequestNotFound } from './errors/friend-request-not-found';
import { UserNotFound } from '../users/errors/user-not-found';

@Injectable()
export class FriendRequestsService {
  constructor(
    @Inject(FRIEND_REQUESTS_REPOSITORY)
    private friendRequestModel: typeof FriendRequest,
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async listUserFriendRequests(@Param('user_id') user_id: number) {
    if (!user_id) throw new MissingId();

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

    if (!friendRequests) throw new FriendRequestNotFound();

    return friendRequests;
  }

  async show(@Param('id') id: number) {
    if (!id) throw new MissingId();

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

    if (!friendRequest) throw new FriendRequestNotFound();

    return friendRequest;
  }

  async create(@Body() sendFriendRequestDto: SendFriendRequestDto) {
    const { id, senderId, receiverId } = sendFriendRequestDto;

    const user = await this.userModel.findByPk(senderId);

    if (!user) throw new UserNotFound();

    const friendRequest = await this.friendRequestModel.create({
      id,
      senderId,
      receiverId,
      message: `Você recebeu um pedido de amizade de ${user.username}`,
    });

    return friendRequest;
  }

  async rejectFriendRequest(@Param('id') id: number) {
    if (!id) throw new MissingId();

    const friendRequest = await this.friendRequestModel.findByPk(id);
    if (!friendRequest) throw new FriendRequestNotFound();

    await friendRequest.destroy();

    return {
      message: 'Você rejeitou o pedido de amizade.',
    };
  }

  async acceptFriendRequest(@Param('id') id: number) {
    if (!id) throw new MissingId();

    const friendRequest = await this.friendRequestModel.findByPk(id);
    if (!friendRequest) throw new FriendRequestNotFound();

    const userWhoSent = await this.userModel.findByPk(friendRequest.senderId);
    const userWhoReceive = await this.userModel.findByPk(
      friendRequest.receiverId,
    );

    if (!userWhoSent) throw new UserNotFound();

    await userWhoSent.$add('friends', friendRequest.receiverId);
    await userWhoReceive.$add('friends', friendRequest.senderId);

    await friendRequest.destroy();

    return {
      message: `Pedido de amizade aceito. Você e ${userWhoSent.username} agora são amigos.`,
    };
  }
}