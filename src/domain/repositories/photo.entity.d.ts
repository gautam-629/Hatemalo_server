import { IPhoto } from "../entities";

export interface IPhotoRepository{
    create(url:string):Promise<IPhoto>
  }