import { IMovie } from "../../domain/interfaces/IMovie";

interface IMovieRepository {
  create(movie: IMovie): Promise<void>;
  findById(id: number): Promise<IMovie | null>;
  findMovieAndItsReviewsById(id: number): Promise<Partial<IMovie>>;
  listAll(
    offset: number,
    limit: number,
  ): Promise<{
    totalItems: number;
    movies: Partial<IMovie>[];
  }>;
}

export { IMovieRepository };
