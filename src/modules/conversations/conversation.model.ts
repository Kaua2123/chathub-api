import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type Type = 'Conversation' | 'Group';

@Table({ timestamps: true })
export class Conversation extends Model {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Default('Conversation')
  @Column(DataType.ENUM('Conversation', 'Group'))
  type: Type;

  @AllowNull(true)
  @Column
  name: string;

  @AllowNull(true)
  @Column
  participants: string;
}
