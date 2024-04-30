import {
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Table,
  Default,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class Message extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Default('')
  @Column
  content: string;

  @AllowNull(false)
  @Default(true)
  @Column
  is_saved: boolean;
}
