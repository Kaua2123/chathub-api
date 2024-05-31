import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  content: string;

  is_sender: boolean;

  @IsNotEmpty()
  ConversationId: number;

  @IsNotEmpty()
  UserId: number;
}
