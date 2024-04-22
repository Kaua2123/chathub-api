import { Friend } from './friend.model';
import * as constants from '../../constants';

export const friendsProviders = [
  {
    provide: constants.FRIENDS_REPOSITORY,
    useValue: Friend,
  },
];
