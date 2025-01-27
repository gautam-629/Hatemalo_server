import { Config } from "../config";
import jwt from 'jsonwebtoken'
import CustomErrorHandler from "./customErrorHandler";
export class JwtToken implements IJwtToken{
    private secretKey:string;
    private expiresIn:string;

    constructor(){
        this.secretKey=Config.JWT_SECRET || "secretKey"
        this.expiresIn=Config.JWT_EXPIRES_IN || '1h'
    }

    generateToken(payload:object):string{
          return jwt.sign(payload,this.secretKey,{expiresIn:this.expiresIn})
    } 

    verifyToken(token:string):object | string{
        try {
            return jwt.verify(token,this.secretKey)
        } catch (error:any) {
          throw  CustomErrorHandler.unAuthorized(error)
        }
    }
}