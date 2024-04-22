import { Inject, Injectable } from '@nestjs/common';
import { FRIENDS_REPOSITORY } from 'src/constants';
import { Friend } from './friend.model';

@Injectable()
export class FriendsService {
  constructor(
    @Inject(FRIENDS_REPOSITORY)
    private friendModel: typeof Friend,
  ) {}
}
