import { IFileUploader } from "../../common/file.uploader";
import { IPhoto } from "../../domain/entities";
import { IPhotoService } from "../../domain/services";
import { IUseCase } from "../../domain/usecase/userCase";
import { PhotoRepository } from "../../infrastructure/database/pgSql/repository/photo.repository";

export class PhotoService implements IPhotoService{
     constructor(
        private photoRepository:PhotoRepository,
        private fileUploader:IFileUploader,
        private createPhotoUseCase: IUseCase<{ fileName: string }, IPhoto>
     ){}

     async create(file: Express.Multer.File): Promise<IPhoto> {
      if (!file) {
        throw new Error("No file uploaded");
      }
      return this.createPhotoUseCase.execute({ fileName: file.filename });
    }
    
    
    findById(id: string): Promise<IPhoto | null> {
       return this.photoRepository.findById(id)
    }

    async deleteById(id: string): Promise<boolean> {
      const photo= await this.photoRepository.findById(id)
      if(!photo){
         return false
      }
      this.fileUploader.deleteFile(photo.photo)
      return this.photoRepository.deleteById(id)
    }
  }
  

