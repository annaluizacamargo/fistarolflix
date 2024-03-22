export interface IUser {
  id: number;
  name?: string;
  email?: string;
  hashedPassword?: string;
  isActive?: boolean;
}
