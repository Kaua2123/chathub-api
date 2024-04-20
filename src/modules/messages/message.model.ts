import {
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Table,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class Message extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Column
  content: string;
}
