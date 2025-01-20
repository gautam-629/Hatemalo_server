
import { Iuser } from "../../domain/entities";
import { IAuthService } from "../../domain/services";

export class AuthService implements IAuthService{
    register(): Promise<Iuser | null> {
        return  new Promise((resolve,reject)=>setTimeout(()=>(resolve(null)),200))
    }
} 