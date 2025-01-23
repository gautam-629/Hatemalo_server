import { IPhoto } from "../entities";

export class IPhotoService{
    create(file:Express.Multer.File):Promise<IPhoto>
}