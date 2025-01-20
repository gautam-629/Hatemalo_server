
import { Iuser } from "../../domain/entities";
import { IAuthService } from "../../domain/services";
import { UserRepository } from "../../infrastructure/database/pgSql/repository/user.repository";

export class AuthService implements IAuthService{
    constructor(private userRepository:UserRepository){}
   register(user:Iuser): Promise<Iuser> {
       return this.userRepository.create(user)
   }
} 