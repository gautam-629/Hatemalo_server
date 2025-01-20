import { Response } from "express";

class ResponseHandler{
    static success(res:Response,data:any,message:string="Success",statusCode:number=200){
           return res.status(statusCode).json({
            status:'success',
            message,
            data
           })
    }
}
export default ResponseHandler;