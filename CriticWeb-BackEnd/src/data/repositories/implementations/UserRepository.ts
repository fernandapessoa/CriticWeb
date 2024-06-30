import { Repository } from "typeorm";
import { IUser } from "../../../domain/interfaces/IUser";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  constructor(private userRepository: Repository<User>) {}

  async create(user: IUser): Promise<void> {
    await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;

    return user;
  }
}

export { UserRepository };
