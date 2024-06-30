import { IUser } from "../../domain/interfaces/IUser";

interface IUserRepository {
  create(user: IUser): Promise<void>;
  findByEmail(email: string): Promise<IUser | null>;
}

export { IUserRepository };
