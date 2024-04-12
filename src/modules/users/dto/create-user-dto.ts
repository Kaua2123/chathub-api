import { Length } from 'class-validator';

export class CreateUserDto {
  id: number;

  @Length(5, 48)
  name: string;

  @Length(5, 20)
  username: string;

  email: string;
  password: string;
  isOnline: boolean;
}
