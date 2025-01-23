import { IPhoto } from "../entities";

export interface IPhotoRepository{
    create(url:string):Promise<IPhoto>
    findById(id:string):Promise<IPhoto | null>
    deleteById(id:string):Promise<boolean>
  }