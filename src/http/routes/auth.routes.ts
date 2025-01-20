import { Router,Request,Response,NextFunction } from "express";
import AuthController from "../controller/auth.controller";
import { AuthService } from "../../application/services/auth.service";
import { UserRepository } from "../../infrastructure/database/pgSql/repository/user.repository";
import { JwtToken } from "../../util/jwtToken";
import { CreateUserDto } from "../../application/dtos/user.dtos";
import { validationMiddleware } from "../middleware/schemaValidator";

const userRepository=new UserRepository()
const jwtToken=new JwtToken()
const authService=new AuthService(userRepository,jwtToken)
const authController=new AuthController(authService)
export const authRouter=(router:Router)=>{
   router.post('/auth/register',
    validationMiddleware(CreateUserDto),
    (req:Request,res:Response,next:NextFunction)=>authController.register(req,res,next))
}