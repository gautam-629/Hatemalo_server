import { Iuser } from "../entities";

export interface IAuthService{
    register():Promise<Iuser|null>
}