import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ timestamps: true, modelName: 'friends_requests' })
export class FriendRequests extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  message: string;
}
