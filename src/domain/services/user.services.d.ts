import { Iuser } from '../entities';

export interface IUserservice {
  create(user: Iuser): Promise<Iuser>;
}
