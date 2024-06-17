import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  content: string;
  is_sender: boolean;
  is_read_by: number[];

  @IsNotEmpty()
  ConversationId: number;

  @IsNotEmpty()
  UserId: number;
}
