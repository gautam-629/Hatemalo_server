import { ITokenUtil, TokenData } from "../common/types";
import * as crypto from "crypto";
export class TokenUtil implements ITokenUtil{

    generateToken(expireInMinutes: number): TokenData {
         const token=crypto.randomBytes(32).toString("hex");
         const expiresAt=new Date(Date.now() + expireInMinutes*60*1000);
         return {token,expiresAt}
    }
   compareToken(providedToken: string, storedToken: string): boolean {
        return providedToken===storedToken;
   }
   isTokenExpire(expireAt: Date ): boolean {
       return new Date() > expireAt;
   }
}