import { Body, Inject, Injectable, Param } from '@nestjs/common';
import { FRIEND_REQUESTS_REPOSITORY, USERS_REPOSITORY } from 'src/constants';
import { FriendRequest } from './friend-request.model';
import { User } from '../users/user.model';
import { SendFriendRequestDto } from './dto/send-friend-request-dto';

@Injectable()
export class FriendRequestsService {
  constructor(
    @Inject(FRIEND_REQUESTS_REPOSITORY)
    private friendRequestModel: typeof FriendRequest,
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async index(@Param('user_id') user_id) {
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
    const friendRequest = await this.friendRequestModel.findByPk(id);

    return friendRequest;
  }

  async create(@Body() sendFriendRequestDto: SendFriendRequestDto) {
    const { id, senderId, receiverId } = sendFriendRequestDto;

    const friendRequest = await this.friendRequestModel.create({
      id,
      senderId,
      receiverId,
      status: 'Pending',
      message: 'Você recebeu um pedido de amizade',
    });

    return friendRequest;
  }
}
