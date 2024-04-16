import {
  AllowNull,
  AutoIncrement,
  BeforeSave,
  Column,
  DataType,
  Default,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { hash } from 'bcrypt';

@Table({ timestamps: true })
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
  @Index({ unique: true })
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
  static async hashPassword(user: User) {
    const password = user.getDataValue('password');
    if (password) user.password_hash = await hash(password, 8);
  }
}
