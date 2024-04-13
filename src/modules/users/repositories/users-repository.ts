import { CreateUserDto } from '../dto/create-user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { User } from '../user.model';

export abstract class UsersRepository {
  abstract index(): Promise<User[]>;
  abstract show(id: number): Promise<User>;
  abstract post(createUserDto: CreateUserDto): Promise<User>;
  abstract update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  abstract delete(id: number): Promise<void>;
}
