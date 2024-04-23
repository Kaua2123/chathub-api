import { Friend } from 'src/modules/friends/friend.model';
import { SendFriendRequestDto } from '../dto/send-friend-request-dto';
import { FriendRequest } from '../friend-request.model';

export abstract class FriendRequestsRepository {
  abstract listUserFriendRequests(user_id: number): Promise<FriendRequest[]>;
  abstract show(id: number): Promise<FriendRequest>;
  abstract create(
    sendFriendRequestDto: SendFriendRequestDto,
  ): Promise<FriendRequest>;
  abstract rejectFriendRequest(id: number): Promise<{ message: string }>;
  abstract acceptFriendRequest(
    id: number,
  ): Promise<{ message: string; newFriend: Friend }>;
}
