import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  content: string;

  @IsNotEmpty()
  ConversationId: number;

  @IsNotEmpty()
  UserId: number;
}
