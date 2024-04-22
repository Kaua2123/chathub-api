import { Status } from '../friend-request.model';

export class SendFriendRequestDto {
  id: number;
  senderId: number;
  receiverId: number;
  status: Status;
  message: string;
}
