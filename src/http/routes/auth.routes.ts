import { Router,Request,Response,NextFunction } from "express";
import AuthController from "../controller/auth.controller";
import { AuthService } from "../../application/services/auth.service";
import { UserRepository } from "../../infrastructure/database/pgSql/repository/user.repository";
import SchemaValidator from "../middleware/schemaValidator";
import { createUserSchema } from "../../application/dtos/user.dtos";

const userRepository=new UserRepository()
const authService=new AuthService(userRepository)
const authController=new AuthController(authService)
export const authRouter=(router:Router)=>{
   router.post('/login',
     SchemaValidator.validate(createUserSchema),
    (req:Request,res:Response,next:NextFunction)=>authController.register(req,res,next))
}