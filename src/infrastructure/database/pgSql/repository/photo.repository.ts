import { QueryRunner, Repository } from "typeorm";
import { IPhotoRepository } from "../../../../domain/repositories";
import { Photo } from "../entity/photo.entity";
import { AppDataSource } from "../data-source";
import { IPhoto } from "../../../../domain/entities";
import { User } from "../entity/User.entity";

export class PhotoRepository implements IPhotoRepository{

      private photoRepository: Repository<Photo>;

    constructor(){
        this.photoRepository=AppDataSource.getRepository(Photo)
    }

    findById(id: string): Promise<IPhoto | null> {
          return this.photoRepository.findOneBy({id:id})
    }

    async deleteById(id: string): Promise<boolean> {
        const result= await this.photoRepository.createQueryBuilder().delete().from(Photo).where("id=:id",{id:id}).execute()
        return result.affected ? result.affected > 0 : false;
      }

     create(user:User,url: string): Promise<IPhoto> {
         return this.photoRepository.save({photo:url,user:user})
     }

     createWithRunner({
        runner,
        user,
        url,
      }: {
        runner: QueryRunner;
        user: User;
        url: string;
      }): Promise<IPhoto> {
        try {
          const repository = runner.manager.getRepository(Photo);
          return repository.save({ user, photo: url });
        } catch (error) {
          throw error;
        }
      }
}