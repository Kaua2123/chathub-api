import { Length } from 'class-validator';
import { Unique } from 'src/custom-decorators/Unique';

export class CreateUserDto {
  id: number;

  @Length(5, 48)
  name: string;

  @Length(5, 20)
  @Unique({
    message: 'Username is already in use.',
  })
  username: string;

  @Unique({
    message: 'Email is already in use.',
  })
  email: string;

  password: string;
  isOnline: boolean;
}
