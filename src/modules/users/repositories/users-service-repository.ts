import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { UsersRepository } from './users-repository';

// parecido com o que o controller faz. útil para o controller "real" depender menos de userservice
@Injectable()
export class UsersServiceRepository implements UsersRepository {
  constructor(private userService: UsersService) {} // não é preciso instanciar userServiceRepository. o nestJS já o faz

  async index(): Promise<User[]> {
    return this.userService.index();
  }

  async show(id: number): Promise<User> {
    return this.userService.show(id);
  }

  async post(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.post(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  async delete(id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
