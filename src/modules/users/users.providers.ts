import { User } from './user.model';
import * as constants from '../../constants';
import { UsersRepository } from './repositories/users-repository';
import { UsersServiceRepository } from './repositories/users-service-repository';

export const usersProviders = [
  {
    provide: constants.USERS_REPOSITORY,
    useValue: User,
  },
  {
    provide: UsersRepository, // ao solicitarem classe desse tipo,
    useClass: UsersServiceRepository, // essa classe será usada.
  },
];
