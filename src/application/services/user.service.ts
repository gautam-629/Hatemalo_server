import { Iuser } from '../../domain/entities';
import { IUserservice } from '../../domain/services';
import { UserRepository } from '../../infrastructure/database/pgSql/repository/user.repository';
import { CreateUserDto, UserDto } from '../dtos/register.user.dtos';

export class UserService implements IUserservice {
  constructor(private userRepository: UserRepository) {}
  async create(user: CreateUserDto): Promise<UserDto> {
    return this.userRepository.create(user);
  }

async  findAllUsers(): Promise<UserDto[] | null> {
    return this.userRepository.findAllUsers()
  }
}
