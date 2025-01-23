import { Router } from "express";
import { PhotoRepository } from "../../infrastructure/database/pgSql/repository/profile.repository";
import { PhotoService } from "../../application/services/photo.service";
import { PhotoController } from "../controller/photo.controller";
import { FileUploader } from "../../util/fileUpload";

const photoRepository=new PhotoRepository()
const fileUploader=new FileUploader()
const photoService=new PhotoService(photoRepository,fileUploader)
const photoController=new PhotoController(photoService)
export const photoRouter=(router:Router):void=>{
      router.post('/upload',
       fileUploader.single("photo"),
       (req,res,next)=>photoController.create(req,res,next))
}