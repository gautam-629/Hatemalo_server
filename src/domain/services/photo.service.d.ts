import { IPhoto } from "../entities";

export class IPhotoService{
    create(file:Express.Multer.File):Promise<IPhoto>
    findById(id:string):Promise<IPhoto | null>
    deleteById(id:string):Promise<boolean>
}