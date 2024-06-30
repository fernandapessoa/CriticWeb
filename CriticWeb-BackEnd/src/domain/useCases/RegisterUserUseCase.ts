import { IUserRepository } from "../../data/repositories/IUserRepository";
import { Errors } from "../errors/errors";
import { IUser } from "../interfaces/IUser";
import bcryptjs from "bcryptjs";

class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password }: IUser): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw Errors.INVALID_USER_DATA;
    }

    password = await bcryptjs.hash(password, 12);

    await this.userRepository.create({ name, email, password });

    return;
  }
}

export { RegisterUserUseCase };
