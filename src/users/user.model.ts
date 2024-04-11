import {
  AllowNull,
  AutoIncrement,
  Column,
  //   DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Default('')
  @Column
  name: string;

  @AllowNull(false)
  @Default('')
  @Unique
  @Column
  username: string;

  @AllowNull(false)
  @Default('')
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Default('')
  @Column
  password: string;

  @Default(true)
  @Column
  isOnline: boolean;
}
