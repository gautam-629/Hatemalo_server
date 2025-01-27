import { plainToClass, plainToInstance } from 'class-transformer';
import { IAuthService } from "../../domain/services";
import { UserRepository } from "../../infrastructure/database/pgSql/repository/user.repository";
import CustomErrorHandler from "../../util/customErrorHandler";
import bcrypt from 'bcryptjs';
import { JwtToken } from "../../util/jwtToken";
import { CreateUserDto, UserDto } from '../dtos/register.user.dtos';
import { LoginUserDto } from '../dtos/login.user.dtos';

export class AuthService implements IAuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtToken: JwtToken,
    ) {}

    async register(userData: CreateUserDto): Promise<UserDto> {
        const alreadyExit = await this.userRepository.findByEmail(userData.email);


        if (alreadyExit) {
            throw CustomErrorHandler.alreadyExist('User Already Exists');
        }
        
        const hashPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await this.userRepository.create({
            ...userData,
            password: hashPassword
        });
        
        const payload = { 
            sub: newUser.id,
            role:newUser.userType
        };
        const token = this.jwtToken.generateToken(payload);

        return plainToClass(UserDto, {
            ...newUser,
            token
        }, { excludeExtraneousValues: true });
    }

    async login(userInput: LoginUserDto): Promise<UserDto> {
        const user=  await this.userRepository.findByEmail(userInput.email);

        if(!user){
            throw CustomErrorHandler.unAuthorized("UserName or Password Wrong!")
        }
        const isPasswordValid= await bcrypt.compare(userInput.password,user.password)

        if(!isPasswordValid){
            throw CustomErrorHandler.unAuthorized("Username or Password Wrong!")
        }
          const payload={
            sub:user.id,
            role:user.updatedAt
          }
        const token=this.jwtToken.generateToken(payload)

        return plainToInstance(UserDto,{
            ...user,
            token
        },{excludeExtraneousValues:true})
    }  
}