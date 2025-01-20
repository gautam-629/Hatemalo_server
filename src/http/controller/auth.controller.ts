import { NextFunction, Request ,Response} from "express";
import { AuthService } from "../../application/services/auth.service";
import ResponseHandler from "../../util/responseHandler";

class AuthController{
    constructor( private authService:AuthService){}
   async register(req:Request,res:Response,next:NextFunction){
        const user=await this.authService.register(req.body)
        ResponseHandler.success(res,user.id,'User Create Sucessfully',201)
    }
}

export default AuthController;