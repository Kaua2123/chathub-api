import { Body, Inject, Injectable, Param } from '@nestjs/common';

import {
  BLOCKED_USERS_REPOSITORY,
  FRIEND_REQUESTS_REPOSITORY,
  NOTIFICATIONS_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/constants';

import { FriendRequest } from './friend-request.model';
import { SendFriendRequestDto } from './dto/send-friend-request-dto';
import { User } from '../users/user.model';

import { MissingId } from '../users/errors/missing-id';
import { FriendRequestNotFound } from './errors/friend-request-not-found';
import { UserNotFound } from '../users/errors/user-not-found';
import { Notification } from '../notifications/notification.model';
import { BlockedUsers } from '../blocked-users/blocked-users.model';
import { NotAllowed } from '../blocked-users/errors/not-allowed';
import { Op } from 'sequelize';
import { AlreadyFriends } from './errors/already-friends';
import { CannotSendFriendRequestToYourself } from './errors/cannot-send-friend-request-to-yourself';

@Injectable()
export class FriendRequestsService {
  constructor(
    @Inject(FRIEND_REQUESTS_REPOSITORY)
    private friendRequestModel: typeof FriendRequest,
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
    @Inject(NOTIFICATIONS_REPOSITORY)
    private notificationsModel: typeof Notification,
    @Inject(BLOCKED_USERS_REPOSITORY)
    private blockedUserModel: typeof BlockedUsers,
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
    const { senderId, receiverId } = sendFriendRequestDto;

    const userWhoSent = await this.userModel.findByPk(senderId);
    const userWhoReceive = await this.userModel.findByPk(receiverId);

    if (senderId == receiverId) throw new CannotSendFriendRequestToYourself();

    const friends: User[] = await userWhoSent.$get('friends' as keyof User);

    // checa se, na lista de amigos do usuario que envia, há o id do usuario que recebe
    friends.map((friend) => {
      if (friend.id == receiverId) throw new AlreadyFriends();
    });

    if (!userWhoSent || !userWhoReceive) throw new UserNotFound();

    const blockedUser = await this.blockedUserModel.findOne({
      where: {
        [Op.or]: [
          {
            UserId: senderId,
            user_who_blocked_id: receiverId,
          },
          {
            UserId: receiverId,
            user_who_blocked_id: senderId,
          },
        ],
      },
    });

    if (blockedUser) throw new NotAllowed();

    const friendRequest = await this.friendRequestModel.create({
      senderId,
      receiverId,
    });

    await this.notificationsModel.create({
      content: `Você recebeu um pedido de amizade de ${userWhoSent.username}`,
      type: 'friend_request',
      UserId: receiverId,
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
