import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  Table,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class Friend extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Default('')
  @Column
  username: string;

  @AllowNull(false)
  @Default(true)
  @Column
  is_online: boolean;

  @AllowNull(false)
  @Default('')
  @Column
  image: string;
}
