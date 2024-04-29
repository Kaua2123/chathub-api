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

export type ConversationType = 'conversation' | 'group';

@Table({ timestamps: true })
export class Conversation extends Model {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Default('conversation')
  @Column(DataType.ENUM('conversation', 'group'))
  type: ConversationType;

  @AllowNull(true)
  @Column
  name: string;

  @AllowNull(true)
  @Column
  participants: string;

  @AllowNull(true)
  @Column
  creator_id: number;
}
