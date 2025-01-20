import { UserRole } from '../../enum';

export interface Iuser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt:Date,
  updatedAt:Date
}
