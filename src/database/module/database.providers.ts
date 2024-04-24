import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import * as constants from '../../constants';

import { User } from '../../modules/users/user.model';
import { FriendRequest } from '../../modules/friend-requests/friend-request.model';
import { BlockedUsers } from '../../modules/blocked-users/blocked-users.model';
import { Group } from '../../modules/groups/group.model';
import { Conversation } from '../../modules/conversation/conversation.model';
import { Notification } from '../../modules/notifications/notifications.model';
import { Message } from '../../modules/messages/message.model';

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
      sequelize.addModels([
        User,
        FriendRequest,
        BlockedUsers,
        Group,
        Conversation,
        Notification,
        Message,
      ]);

      User.belongsToMany(User, {
        as: 'friends',
        through: 'users_friends',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'userId',
      });
      User.belongsToMany(User, {
        as: 'friendOf',
        through: 'users_friends',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'friendId',
      });

      User.belongsToMany(User, {
        as: 'sender',
        through: FriendRequest,
        foreignKey: 'senderId',
      });

      User.belongsToMany(User, {
        as: 'receiver',
        through: FriendRequest,
        foreignKey: 'receiverId',
      });

      User.hasMany(BlockedUsers);
      BlockedUsers.belongsToMany(User, {
        through: 'users_blocked_users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      User.hasMany(Group);
      Group.belongsToMany(User, {
        through: 'users_groups',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      User.hasMany(Conversation);
      Conversation.belongsTo(User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Group.hasOne(Conversation);
      Conversation.belongsTo(Group, {
        foreignKey: {
          allowNull: true,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      User.hasMany(Notification);
      Notification.belongsTo(User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Conversation.hasMany(Notification);
      Notification.belongsTo(Conversation, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      User.hasMany(Message);
      Message.belongsToMany(User, {
        through: 'users_messages',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      await sequelize.sync();
      return sequelize;
    },
  },
];
