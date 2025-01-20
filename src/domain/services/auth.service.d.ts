import { Iuser } from "../entities";

export interface IAuthService{
    register(user:Iuser):Promise<Iuser>
}