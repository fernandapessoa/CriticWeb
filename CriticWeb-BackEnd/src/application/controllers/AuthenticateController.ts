import { Request, Response } from "express";
import { IUser as IRequest } from "../../domain/interfaces/IUser";
import { RegisterUserUseCase } from "../../domain/useCases/RegisterUserUseCase";
import { errorHandler } from "../../domain/errors/errorHandler";
import { UserRepository } from "../../data/repositories/implementations/UserRepository";
import { dataSource } from "../../data/config/dataSource";
import { User } from "../../data/entities/User";
import { AuthenticateUserUseCase } from "../../domain/useCases/AuthenticateUserUseCase";

class AuthenticateController {
  async register(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password }: IRequest = request.body;

      const userRepository = new UserRepository(dataSource.getRepository(User));

      const registerUserUseCase = new RegisterUserUseCase(userRepository);
      const authenticateUserUseCase = new AuthenticateUserUseCase(
        userRepository,
      );

      await registerUserUseCase.execute({ name, email, password });

      const token = await authenticateUserUseCase.execute(email, password);

      return response
        .status(200)
        .header("Authorization", `Bearer ${token}`)
        .json({ message: "Successfull registration." });
    } catch (error) {
      const errorCaptured = errorHandler(error as string);

      return response
        .status(errorCaptured.status)
        .json({ message: errorCaptured.message });
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password }: IRequest = request.body;

      const userRepository = new UserRepository(dataSource.getRepository(User));

      const authenticateUserUseCase = new AuthenticateUserUseCase(
        userRepository,
      );

      const token = await authenticateUserUseCase.execute(email, password);

      return response
        .status(200)
        .header("Authorization", `Bearer ${token}`)
        .json({ message: "Successfull login." });
    } catch (error) {
      const errorCaptured = errorHandler(error as string);

      return response
        .status(errorCaptured.status)
        .json({ message: errorCaptured.message });
    }
  }
}

export { AuthenticateController };
