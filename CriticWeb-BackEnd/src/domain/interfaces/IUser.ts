interface IUser {
  userId?: number;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export { IUser };
