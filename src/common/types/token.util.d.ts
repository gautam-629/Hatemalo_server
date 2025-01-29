export interface TokenData{
    token:string;
    expiresAt:Date;
}
export class ITokenUtil{
    generateToken(expireInMinutes:number):TokenData;
    compareToken(providedToken:string,storedToken:string):boolean;
    isTokenExpire(expireAt:Date):boolean
}