import { Repository } from "typeorm";
import { IPhotoRepository } from "../../../../domain/repositories";
import { Photo } from "../entity/profile.entity";
import { AppDataSource } from "../data-source";
import { IPhoto } from "../../../../domain/entities";

export class PhotoRepository implements IPhotoRepository{

      private photoRepository: Repository<Photo>;

    constructor(){
        this.photoRepository=AppDataSource.getRepository(Photo)
    }

    findById(id: string): Promise<IPhoto | null> {
          return this.photoRepository.findOneBy({id:id})
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await this.photoRepository.delete(id);
        return result?.affected! > 0;
      }

     create(url: string): Promise<IPhoto> {
         return this.photoRepository.save({photo:url})
     }
}