import { IsString, MinLength } from "class-validator";

export class ResetPasswordDtos {
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @IsString()
  newPassword: string;
}
