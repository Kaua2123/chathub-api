import {
  AutoIncrement,
  Column,
  DataType,
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

  @Column
  message: string;

  @Column(DataType.ENUM('Pending', 'Accepted', 'Rejected'))
  status: Status;
}
