import { NextFunction ,Request,Response} from "express";
import { PhotoService } from "../../application/services/photo.service";
import CustomErrorHandler from "../../util/customErrorHandler";
import ResponseHandler from "../../util/responseHandler";

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

 async findById(req:Request,res:Response,next:NextFunction){
     try {
         const {id}=req.params;
         const photo= await this.photoService.findById(id);
         if(!photo){
          return next(CustomErrorHandler.notFound("Photo not found"))
         }
         return ResponseHandler.success(res,photo,"Sucess",200)
     } catch (error) {
      return next(error)
     }
  }
 async deleteById(req:Request,res:Response,next:NextFunction){
      try {
         const {id}=req.params;
         const deleted= await this.photoService.deleteById(id);
         if(!deleted){
          return next(CustomErrorHandler.notFound("Photo not found"))
         }
         return ResponseHandler.success(res,null,"Photo Deleted Sucessfully",200)
      } catch (error) {
         next(error)
      }
 }
}