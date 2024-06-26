import {
  Model,
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
  AfterSave,
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
  @Column(DataType.JSON)
  participants: string;

  @AllowNull(true)
  @Column
  image: string;

  @Column(DataType.VIRTUAL)
  image_url: string;

  @AllowNull(true)
  @Column
  creator_id: number;

  @AllowNull(true)
  @Column
  invited_id: number;

  @AfterSave // apenas para o caso de conversation ser um group
  static async addImageUrl(conversation: Conversation) {
    const image = conversation.getDataValue('image');
    if (image) conversation.image_url = `http://localhost:3000/images/${image}`;
  }
}
