import { Injectable } from '@nestjs/common';
import { BlockedUsers } from '../blocked-users.model';
import { BlockedUsersService } from '../blocked-users.service';
import { BlockUserDto } from '../dto/block-user-dto';
import { BlockedUsersRepository } from './blocked-users-repository';

@Injectable()
export class BlockedUsersServiceRepository implements BlockedUsersRepository {
  constructor(private readonly blockedUsersService: BlockedUsersService) {}

  async blockUserById(
    id: number,
    blockUserDto: BlockUserDto,
  ): Promise<{ message: string; blockedUser: BlockedUsers }> {
    return this.blockedUsersService.blockUserById(id, blockUserDto);
  }

  async unblockUserById(id: number): Promise<{ message: string }> {
    return this.blockedUsersService.unblockUserById(id);
  }
}
