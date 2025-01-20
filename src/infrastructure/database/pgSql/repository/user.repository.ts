import { Repository } from 'typeorm';
import { Iuser } from '../../../../domain/entities';
import { IUserRepository } from '../../../../domain/repositories';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { CreateUserDto, UserDto } from '../../../../application/dtos/user.dtos';

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async create(user: CreateUserDto): Promise<UserDto> {
    return this.userRepository.save(user);
  }

  findByEmail(email: string): Promise<Iuser | null> {
    return this.userRepository.findOneBy({email:email})
  }
}
