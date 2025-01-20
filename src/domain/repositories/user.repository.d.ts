import { Iuser } from '../entities';

export interface IUserRepository {
  create(user: Iuser): Promise<Iuser>;
  findByEmail(email:string):Promise<Iuser | null>;
}
