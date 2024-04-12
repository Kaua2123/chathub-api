import { User } from './user.model';
import * as constants from '../../constants';

export const usersProviders = [
  {
    provide: constants.USERS_REPOSITORY,
    useValue: User,
  },
];
