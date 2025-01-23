import { IFileUploader } from "../../common/file.uploader";
import { IPhoto } from "../../domain/entities";
import { IPhotoService } from "../../domain/services";
import { PhotoRepository } from "../../infrastructure/database/pgSql/repository/profile.repository";

export class PhotoService implements IPhotoService{
     constructor(
        private photoRepository:PhotoRepository,
        private fileUploader:IFileUploader
     ){}

     async create(file: Express.Multer.File): Promise<IPhoto> {
      if (!file) {
        throw new Error("No file uploaded");
      }
  
      try {
      //   const photoData = {
      //     photo: file.filename,
      //   };
  
        return await this.photoRepository.create(file.filename);
      } catch (error) {
        this.fileUploader.deleteFile(file.filename);
        throw error;
      }
    }
}