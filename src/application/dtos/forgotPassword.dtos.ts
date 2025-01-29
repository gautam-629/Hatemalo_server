import { IsEmail, IsString } from "class-validator";

export class forgotPasswordDto {
  @IsEmail({}, { message: "Invalid email address" })
  @IsString()
  email: string;

}
