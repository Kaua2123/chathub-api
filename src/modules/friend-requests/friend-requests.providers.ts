import { FriendRequest } from './friend-request.model';
import { FriendRequestsRepository } from './repositories/friend-requests-repository';
import { FriendRequestsServiceRepository } from './repositories/friend-requests-service-repository';
import * as constants from '../../constants';

export const friendRequestsProviders = [
  {
    provide: constants.FRIEND_REQUESTS_REPOSITORY,
    useValue: FriendRequest,
  },
  {
    provide: FriendRequestsRepository,
    useClass: FriendRequestsServiceRepository,
  },
];
