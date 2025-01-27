import { NextFunction } from "express";
import { UserDto } from "../application/dtos/register.user.dtos";
import { User } from "../infrastructure/database/pgSql/entity/User.entity";

export interface IAsyncLocalStorage{
    setUser(data:UserDto,next:NextFunction):void,
    getUser():User | null
}