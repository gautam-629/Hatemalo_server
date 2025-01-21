import { UserType } from '../../enum';

export interface Iuser {
  id: string;
  email: string;
  name:string;
  password: string;
  phoneNumber:string;
  userType:UserType
  profilePicture:string
  createdAt:Date,
  updatedAt:Date
}
