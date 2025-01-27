import { Exclude, Expose } from 'class-transformer';
import { IsEmail, MinLength, IsString, minLength, MaxLength, IsOptional, IsEnum } from 'class-validator';
import {  UserType } from '../../enum';

export class CreateUserDto {
  @IsEmail({}, { message: "Invalid email address" })
  @IsString()
  email: string;

  @IsString({ message: "Phone number must be a string" })
  phoneNumber: string;

  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' }) // Adjusted to allow longer names
  @IsString()
  name: string;

  @IsEnum(UserType, { message: 'Invalid user type' })
  @IsString()
  userType: UserType;

  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @IsString()
  password: string;
}


@Exclude()
export class UserDto{
  @Expose()
  id: string;
 
  @Expose()
   name: string;

  @Expose()
   phoneNumber: string;

   @Expose()
   userType: UserType;

   @Expose()
   email: string;


  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  token?: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
