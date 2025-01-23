import { UserDto } from '../../application/dtos/user.dtos';
import { Iuser } from '../entities';

export interface IUserRepository {
  create(user: CreateUserDto): Promise<UserDto>;
  findByEmail(email:string):Promise<Iuser | null>;
  findAllUsers():Promise<UserDto[] | null>
}
