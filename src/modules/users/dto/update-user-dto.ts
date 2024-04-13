import { Length } from 'class-validator';

export class UpdateUserDto {
  @Length(5, 48)
  name: string;

  @Length(5, 20)
  username: string;

  email: string;
  password: string;
}
