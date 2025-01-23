import { Router,Request,Response,NextFunction } from "express";
import { PhotoRepository } from "../../infrastructure/database/pgSql/repository/photo.repository";
import { PhotoService } from "../../application/services/photo.service";
import { PhotoController } from "../controller/photo.controller";
import { FileUploader } from "../../util/fileUpload";

const photoRepository=new PhotoRepository()
const fileUploader=new FileUploader()
const photoService=new PhotoService(photoRepository,fileUploader)
const photoController=new PhotoController(photoService)
export const photoRouter = (router: Router): void => {
      // Route for uploading a photo
      router.post(
        '/upload',
        fileUploader.single("photo"), // Middleware to handle file upload
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
