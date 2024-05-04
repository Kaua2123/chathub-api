import { BlockedUsers } from '../blocked-users.model';
import { BlockUserDto } from '../dto/block-user-dto';

export abstract class BlockedUsersRepository {
  abstract blockUserById(
    id: number,
    blockUserDto: BlockUserDto,
  ): Promise<{
    message: string;
    blockedUser: BlockedUsers;
  }>;

  abstract unblockUserById(id: number): Promise<{
    message: string;
  }>;
}
