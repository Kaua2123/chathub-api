import {
  AllowNull,
  AutoIncrement,
  BeforeSave,
  Column,
  DataType,
  //   DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';

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
  @Column(DataType.VIRTUAL)
  password: string;

  @AllowNull(false)
  @Default('')
  @Column
  password_hash: string;

  @Default(true)
  @Column
  isOnline: boolean;

  @BeforeSave
  static hashPassword(user: User) {
    const password = user.password;
    if (password) user.password_hash = bcrypt.hashSync(password, 8);
  }
}
