import { FriendsRepository } from './repositories/friends-repository';
import { FriendsServiceRepository } from './repositories/friends-service-repository';

export const friendsProviders = [
  {
    provide: FriendsRepository,
    useClass: FriendsServiceRepository,
  },
];
