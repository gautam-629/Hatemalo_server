import { Exclude, Expose } from 'class-transformer';
import { IsEmail, MinLength, IsString, IsOptional } from 'class-validator';
import { UserRole } from '../../enum';

export class CreateUserDto {
  @IsEmail({}, { message: "Invalid email address" })
  @IsString()
  email: string;

  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @IsString()
  password: string;
}

@Exclude()
export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

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
