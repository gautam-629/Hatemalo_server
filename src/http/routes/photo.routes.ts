import { Router,Request,Response,NextFunction } from "express";
import { PhotoRepository } from "../../infrastructure/database/pgSql/repository/photo.repository";
import { PhotoService } from "../../application/services/photo.service";
import { PhotoController } from "../controller/photo.controller";
import { FileUploader } from "../../util/fileUpload";
import { CreatePhotoUseCase } from "../../application/userCase/createPhoto.usecase";
import { UserRepository } from "../../infrastructure/database/pgSql/repository/user.repository";
import { AsyncLocalStorage } from "../../util/asyncLocalStorage";
import { authMiddleware } from "../middleware/authenticate";

const photoRepository=new PhotoRepository()
const fileUploader=new FileUploader()
const userRepository=new UserRepository()
const asyncLocalStorage=new AsyncLocalStorage()
const createPhotoUseCase=new CreatePhotoUseCase(userRepository,photoRepository,asyncLocalStorage,fileUploader)
const photoService=new PhotoService(photoRepository,fileUploader,createPhotoUseCase)
const photoController=new PhotoController(photoService)

export const photoRouter = (router: Router): void => {
      // Route for uploading a photo
      router.post(
        '/upload',
        authMiddleware.authenticate() as unknown as (req: Request, res: Response, next: NextFunction) => void,
        fileUploader.single("photo"),
        (req: Request, res: Response, next: NextFunction): void => {
          photoController.create(req, res, next);
        }
      );
    
      // Route for getting a photo by ID
      router.get(
        '/upload/:id',
        (req: Request, res: Response, next: NextFunction): void => {
          photoController.findById(req, res, next);
        }
      );
    
      // Route for deleting a photo by ID
      router.delete(
        '/upload/:id',
        (req: Request, res: Response, next: NextFunction): void => {
          photoController.deleteById(req, res, next);
        }
      );
    };
