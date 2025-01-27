import { CreateUserDto, UserDto } from '../../application/dtos/register.user.dtos';
import { Iuser } from '../entities';

export interface IUserservice {
  create(user: CreateUserDto): Promise<UserDto>;
  findAllUsers():Promise<UserDto[] | null>
}
