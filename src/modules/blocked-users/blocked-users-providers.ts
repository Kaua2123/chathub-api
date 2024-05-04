import * as constants from 'src/constants';
import { BlockedUsers } from './blocked-users.model';
import { BlockedUsersRepository } from './repositories/blocked-users-repository';
import { BlockedUsersServiceRepository } from './repositories/blocked-users-service-repository';

export const blockedUsersProviders = [
  {
    provide: constants.BLOCKED_USERS_REPOSITORY,
    useValue: BlockedUsers,
  },
  {
    provide: BlockedUsersRepository,
    useClass: BlockedUsersServiceRepository,
  },
];
