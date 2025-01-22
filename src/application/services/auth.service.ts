import { plainToClass } from 'class-transformer';
import { IAuthService } from "../../domain/services";
import { UserRepository } from "../../infrastructure/database/pgSql/repository/user.repository";
import CustomErrorHandler from "../../util/customErrorHandler";
import bcrypt from 'bcryptjs';
import { JwtToken } from "../../util/jwtToken";
import { CreateUserDto, UserDto } from '../dtos/user.dtos';

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
}