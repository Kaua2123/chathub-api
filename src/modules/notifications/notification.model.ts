import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Default,
  DataType,
} from 'sequelize-typescript';

export type NotificationType = 'friend_request' | 'message';

@Table({ timestamps: true })
export class Notification extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Default('')
  @Column
  content: string;

  @AllowNull(false)
  @Column(DataType.ENUM('friend_request', 'message'))
  type: NotificationType;
}
