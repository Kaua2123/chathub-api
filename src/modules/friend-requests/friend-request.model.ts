import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type Status = 'Pending' | 'Accepted' | 'Rejected';

@Table({ timestamps: true, modelName: 'friends_request' })
export class FriendRequest extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Default('')
  @Column
  message: string;

  @Default('Pending')
  @Column(DataType.ENUM('Pending', 'Accepted', 'Rejected'))
  status: Status;

  senderId?: number;
  receiverId?: number;
}
