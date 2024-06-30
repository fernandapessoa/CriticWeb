import { IMovieRepository } from "../../data/repositories/IMovieRepository";
import { IMovie } from "../interfaces/IMovie";

class CreateMovieUseCase {
  constructor(private userRepository: IMovieRepository) {}

  async execute(movie: IMovie): Promise<void> {
    await this.userRepository.create(movie);

    return;
  }
}

export { CreateMovieUseCase };
