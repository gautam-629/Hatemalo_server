import { Repository } from 'typeorm';
import { Iuser } from '../../../../domain/entities';
import { IUserRepository } from '../../../../domain/repositories';
import { User } from '../entity/User.entity';
import { AppDataSource } from '../data-source';
import { CreateUserDto, UserDto } from '../../../../application/dtos/register.user.dtos';

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async create(user: CreateUserDto): Promise<UserDto> {
    return this.userRepository.save(user);
  }


  async findAllUsers(): Promise<UserDto[] | null> {
    return this.userRepository.find({
      relations:{
        photo:true
      }
    })
  }

  findById(id: string): Promise<Iuser | null> {
    return this.userRepository.findOneBy({id:id})
  }

  findByEmail(email: string): Promise<Iuser | null> {
    return this.userRepository.findOneBy({email:email})
  }

  async updateUser(id: string, data: Partial<Iuser>): Promise<Iuser | null> {
    await this.userRepository.update(id, data);
    return this.findById(id); 
}

async findOneByField<T extends keyof User>(field: T, value: User[T]): Promise<Iuser | null> {
  return this.userRepository.findOneBy({ [field]: value } as any);
}

}
