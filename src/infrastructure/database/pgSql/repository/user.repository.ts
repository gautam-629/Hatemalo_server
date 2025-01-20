import { Repository } from 'typeorm';
import { Iuser } from '../../../../domain/entities';
import { IUserRepository } from '../../../../domain/repositories';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async create(user: Iuser): Promise<Iuser> {
    return this.userRepository.save(user);
  }

  findByEmail(email: string): Promise<Iuser | null> {
    return this.userRepository.findOneBy({email:email})
  }
}
