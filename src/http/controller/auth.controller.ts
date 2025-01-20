import { NextFunction, Request ,Response} from "express";
import { AuthService } from "../../application/services/auth.service";
import ResponseHandler from "../../util/responseHandler";

class AuthController{
    constructor( private authService:AuthService){}
   async register(req:Request,res:Response,next:NextFunction){
    try {
        const user=await this.authService.register(req.body)
        ResponseHandler.success(res,{id:user.id},'User Create Sucessfully',201)
    } catch (error) {
        next(error)
    }
        
    }
}

export default AuthController;