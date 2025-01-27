import { QueryRunner } from "typeorm";
import { UserDto } from "../../application/dtos/register.user.dtos";
import { IPhoto } from "../entities";
import { User } from "../entity/User.entity";

export interface IPhotoRepository {
  create(user: UserDto, url: string): Promise<IPhoto>;
  findById(id: string): Promise<IPhoto | null>;
  deleteById(id: string): Promise<boolean>;
  createWithRunner({
    runner,
    user,
    url,
  }: {
    runner: QueryRunner;
    user: User;
    url: string;
  }): Promise<IPhoto>;
}
