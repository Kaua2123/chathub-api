import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  Table,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class Friend extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Column
  is_online: boolean;

  @AllowNull(false)
  @Column
  image: string;
}
