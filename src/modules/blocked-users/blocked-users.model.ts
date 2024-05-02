import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ timestamps: true, modelName: 'blocked_users' })
export class BlockedUsers extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Column
  user_who_blocked_id: number;
}
