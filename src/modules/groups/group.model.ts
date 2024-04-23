import {
  AllowNull,
  AutoIncrement,
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class Group extends Model {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Default('')
  @Column
  name: string;

  @AllowNull(false)
  @Default('')
  @Column
  image: string;
}
