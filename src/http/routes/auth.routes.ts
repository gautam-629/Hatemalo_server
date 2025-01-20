import { Router,Request,Response,NextFunction } from "express";
import AuthController from "../controller/auth.controller";
import { AuthService } from "../../application/services/auth.service";
import { UserRepository } from "../../infrastructure/database/pgSql/repository/user.repository";
import SchemaValidator from "../middleware/schemaValidator";
import { createUserSchema } from "../../application/dtos/user.dtos";
import { JwtToken } from "../../util/jwtToken";

const userRepository=new UserRepository()
const jwtToken=new JwtToken()
const authService=new AuthService(userRepository,jwtToken)
const authController=new AuthController(authService)
export const authRouter=(router:Router)=>{
   router.post('/auth/register',
     SchemaValidator.validate(createUserSchema),
    (req:Request,res:Response,next:NextFunction)=>authController.register(req,res,next))
}