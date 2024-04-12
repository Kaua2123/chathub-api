import { CreateUserDto } from '../dto/create-user-dto';
import { User } from '../user.model';

export abstract class UserRepository {
  abstract index(): Promise<User[]>;
  abstract show(id: number): Promise<User>;
  abstract post(createUserDto: CreateUserDto): Promise<User>;
  //   abstract update();
  //   abstract delete();
}
