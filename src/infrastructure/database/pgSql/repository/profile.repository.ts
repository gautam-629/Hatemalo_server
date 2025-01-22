import { Repository } from "typeorm";
import { IPhotoRepository } from "../../../../domain/repositories";
import { Photo } from "../entity/profile.entity";
import { AppDataSource } from "../data-source";
import { IPhoto } from "../../../../domain/entities";

export class PhotoRepository implements IPhotoRepository{

      private profileRepository: Repository<Photo>;

    constructor(){
        this.profileRepository=AppDataSource.getRepository(Photo)
    }

     create(url: string): Promise<IPhoto> {
         return this.profileRepository.save({photo:url})
     }
}