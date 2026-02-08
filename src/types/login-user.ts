import { Role } from '../generated/prisma/enums';

export interface LoggedInUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
}
