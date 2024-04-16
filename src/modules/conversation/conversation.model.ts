import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
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
  id: number;

  @BelongsToMany(() => User, {
    through: 'UserConversation',
    foreignKey: 'conversation_Id',
    otherKey: 'user_Id',
  })
  participants: User[];
}
