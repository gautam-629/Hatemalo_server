import { NextFunction ,Request,Response} from "express";
import { PhotoService } from "../../application/services/photo.service";
import CustomErrorHandler from "../../util/customErrorHandler";

export class PhotoController{
  constructor(private photoService:PhotoService){}
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      
      if (!file) {
        return next(CustomErrorHandler.badRequest("No file uploaded"));
      }

      const createdPhoto = await this.photoService.create(file);
      res.status(201).json({ photo: createdPhoto });
    } catch (error) {
      next(error);
    }
  }


}