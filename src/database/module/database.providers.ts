import { Sequelize } from 'sequelize-typescript';
import { User } from '../../modules/users/user.model';
import { Friend } from '../../modules/friends/friend.model';
import { FriendRequests } from '../../modules/friend_requests/friend_requests.model';
import * as constants from '../../constants';
import 'dotenv/config';

const { DATABASE, DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD } =
  process.env;

export const databaseProviders = [
  {
    provide: constants.SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: DATABASE_HOST,
        port: 3306,
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: DATABASE,
      });
      sequelize.addModels([User, Friend, FriendRequests]);

      User.hasMany(Friend);
      Friend.belongsToMany(User, { through: 'users_friends' });

      User.hasMany(FriendRequests, { foreignKey: 'user_id' });
      FriendRequests.belongsTo(FriendRequests, { foreignKey: 'user_id' });

      await sequelize.sync();
      return sequelize;
    },
  },
];
