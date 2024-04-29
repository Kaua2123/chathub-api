import {
  Model,
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type ConversationType = 'Conversation' | 'Group';

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
  type: ConversationType;

  @AllowNull(true)
  @Column
  name: string;

  @AllowNull(true)
  @Column
  participants: string;
}
