import * as constants from 'src/constants';
import { BlockedUsers } from './blocked-users.model';

export const blockedUsersProviders = [
  {
    provide: constants.BLOCKED_USERS_REPOSITORY,
    useValue: BlockedUsers,
  },
];
