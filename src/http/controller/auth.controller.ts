import { NextFunction, Request ,Response} from "express";
import { AuthService } from "../../application/services/auth.service";
import ResponseHandler from "../../util/responseHandler";
import { Logger } from "winston";

class AuthController{
    constructor( 
        private authService:AuthService,
        private logger:Logger
    ){}
   async register(req:Request,res:Response,next:NextFunction){
    try {
        const user=await this.authService.register(req.body)

         this.logger.info("User has been registered",user)

        ResponseHandler.success(res,user,'User Create Sucessfully',201)
        
    } catch (error) {
        next(error)
    }
        
    }

   async login(req:Request,res:Response,next:NextFunction){
         try {
            const user= await this.authService.login(req.body)
            this.logger.info("User has been Login",user)
           return ResponseHandler.success(res,user,"user Login Sucessfully",201)
         } catch (error) {
            next(error)
         }
    }
}

export default AuthController;