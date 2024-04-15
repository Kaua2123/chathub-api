import { Model } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table({ timestamps: true })
export class Conversation extends Model {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  declare participants: number[];
}

Conversation.belongsToMany(User, {
  foreignKey: 'user_id',
  through: 'UserConversation',
});

User.belongsToMany(Conversation, {
  foreignKey: 'user_id',
  through: 'UserConversation',
});
