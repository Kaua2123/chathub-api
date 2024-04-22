import { FriendRequest } from './friend-request.model';
import * as constants from '../../constants';

export const friendRequestsProviders = [
  {
    provide: constants.FRIEND_REQUESTS_REPOSITORY,
    useValue: FriendRequest,
  },
];
