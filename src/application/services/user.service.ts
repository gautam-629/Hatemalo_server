import { Iuser } from '../../domain/entities';
import { IUserservice } from '../../domain/services';
import { UserRepository } from '../../infrastructure/database/pgSql/repository/user.repository';

export class UserService implements IUserservice {
  constructor(private userRepository: UserRepository) {}
  async create(user: Iuser): Promise<Iuser> {
    return this.userRepository.create(user);
  }
}
