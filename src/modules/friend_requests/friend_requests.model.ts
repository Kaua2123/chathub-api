import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class FriendRequests extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  message: string;
}
