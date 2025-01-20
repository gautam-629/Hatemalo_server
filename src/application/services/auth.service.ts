
import { Iuser } from "../../domain/entities";
import { IAuthService } from "../../domain/services";
import { UserRepository } from "../../infrastructure/database/pgSql/repository/user.repository";
import CustomErrorHandler from "../../util/customErrorHandler";
import bcrypt from 'bcryptjs'
export class AuthService implements IAuthService{
    constructor(private userRepository:UserRepository){}
  async register(user:Iuser): Promise<Iuser> {
       
       const alreadyExit= await this.userRepository.findByEmail(user.email)
       if(alreadyExit){
         throw CustomErrorHandler.alreadyExist('User Already Exists')
       }
        const hashPassword= await bcrypt.hash(user.password,10)
   
       return this.userRepository.create({...user,password:hashPassword})
   }
} 