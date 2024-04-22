import { FriendRequests } from './friend-requests.model';
import * as constants from '../../constants';

export const friendRequestsProviders = [
  {
    provide: constants.FRIEND_REQUESTS_REPOSITORY,
    useValue: FriendRequests,
  },
];
