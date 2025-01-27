import { IUserRepository } from "../../domain/repositories";

export class AuthMiddleware{
    private jwtToken:IJwtToken;
    private userRepository:IUserRepository;
    
}