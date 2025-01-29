import { UserType } from '../../enum';

export interface Iuser {
  id: string;
  email: string;
  name:string;
  password: string;
  phoneNumber:string;
  userType:UserType
  createdAt:Date,
  updatedAt:Date,
  resetPasswordToken:string | undefined,
  resetPasswordExpires:Date | undefined
}
