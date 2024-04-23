import { Injectable } from '@nestjs/common';
import { FriendRequestsRepository } from './friend-requests-repository';
import { FriendRequest } from '../friend-request.model';
import { SendFriendRequestDto } from '../dto/send-friend-request-dto';
import { Friend } from 'src/modules/friends/friend.model';
import { FriendRequestsService } from '../friend-requests.service';

@Injectable()
export class FriendRequestsServiceRepository
  implements FriendRequestsRepository
{
  constructor(private friendRequestsService: FriendRequestsService) {}

  async listUserFriendRequests(user_id: number): Promise<FriendRequest[]> {
    return this.friendRequestsService.listUserFriendRequests(user_id);
  }

  async show(id: number): Promise<FriendRequest> {
    return this.friendRequestsService.show(id);
  }

  async create(
    sendFriendRequestDto: SendFriendRequestDto,
  ): Promise<FriendRequest> {
    return this.friendRequestsService.create(sendFriendRequestDto);
  }

  async acceptFriendRequest(
    id: number,
  ): Promise<{ message: string; newFriend: Friend }> {
    return this.friendRequestsService.acceptFriendRequest(id);
  }

  async rejectFriendRequest(id: number): Promise<{ message: string }> {
    return this.friendRequestsService.rejectFriendRequest(id);
  }
}
