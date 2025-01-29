import { Router,Request,Response,NextFunction } from "express";
import AuthController from "../controller/auth.controller";
import { AuthService } from "../../application/services/auth.service";
import { UserRepository } from "../../infrastructure/database/pgSql/repository/user.repository";
import { JwtToken } from "../../util/jwtToken";
import { CreateUserDto } from "../../application/dtos/register.user.dtos";
import { validationMiddleware } from "../middleware/schemaValidator";
import logger from "../../config/logger";
import { LoginUserDto } from "../../application/dtos/login.user.dtos";
import { TokenUtil } from "../../util/tokenUtil";
import { EmailService } from "../../util/emailUtil";
import { forgotPasswordDto } from "../../application/dtos";


const userRepository=new UserRepository()
const jwtToken=new JwtToken()
const tokenUtil=new TokenUtil()
const emailService=new EmailService()
const authService=new AuthService(userRepository,jwtToken,tokenUtil,emailService)
const authController=new AuthController(authService,logger)

export const authRouter=(router:Router)=>{
   router.post('/auth/register',
    validationMiddleware(CreateUserDto),
    (req:Request,res:Response,next:NextFunction)=>authController.register(req,res,next))

    router.post('/auth/login',
        validationMiddleware(LoginUserDto),
        (req:Request,res:Response,next:NextFunction):void=>{
            authController.login(req,res,next)
        })
        router.post('/auth/forgot-password',
            validationMiddleware(forgotPasswordDto),
            (req:Request,res:Response,next:NextFunction):void=>{
                authController.forgotPassword(req,res,next)
            })
}