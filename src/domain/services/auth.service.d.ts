import { LoginUserDto } from "../../application/dtos/login.user.dtos";
import { UserDto } from "../../application/dtos/register.user.dtos";
import { Iuser } from "../entities";

export interface IAuthService{
    register(user:Iuser):Promise<UserDto>
    login(user:LoginUserDto):Promise<UserDto>
}