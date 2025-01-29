import { UserDto } from '../../application/dtos/register.user.dtos';
import { Iuser } from '../entities';

export interface IUserRepository {
  create(user: CreateUserDto): Promise<UserDto>;
  findByEmail(email:string):Promise<Iuser | null>;
  findById(id:string):Promise<Iuser | null>;
  findAllUsers():Promise<UserDto[] | null>;
  updateUser(id:string,data:Iuser):Promise<Iuser | null>
}
