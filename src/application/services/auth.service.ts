import { plainToClass, plainToInstance } from 'class-transformer';
import { IAuthService } from "../../domain/services";
import { UserRepository } from "../../infrastructure/database/pgSql/repository/user.repository";
import CustomErrorHandler from "../../util/customErrorHandler";
import bcrypt from 'bcryptjs';
import { JwtToken } from "../../util/jwtToken";
import { CreateUserDto, UserDto } from '../dtos/register.user.dtos';
import { LoginUserDto } from '../dtos/login.user.dtos';
import { IEmailOptions, IEmailService, ITokenUtil } from '../../common/types';

export class AuthService implements IAuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtToken: JwtToken,
        private tokenUtil:ITokenUtil,
        private emailUtil:IEmailService
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
            role:user.userType
          }
        const token=this.jwtToken.generateToken(payload)

        return plainToInstance(UserDto,{
            ...user,
            token
        },{excludeExtraneousValues:true})
    }  


    async forgotPassword(email: string): Promise<Record<string,string>> {
        const user= await this.userRepository.findByEmail(email)
        if(!user){
            throw CustomErrorHandler.notFound("Email not found")
        }
        
      const {token:resetPasswordToken,expiresAt:resetPasswordExpires} = this.tokenUtil.generateToken(60)

      await this.userRepository.updateUser(user.id, {
        resetPasswordToken,
        resetPasswordExpires
    });
      const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`;

      const emailOptions:IEmailOptions={
           to:user.email,
           html:`<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
           subject:"Password Reset Request",
      }

    await this.emailUtil.sendEmail(emailOptions)

    // return  sendEmail;

      return { message: "Password reset email sent successfully" };
    }
}