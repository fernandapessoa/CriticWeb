import { Repository } from "typeorm";
import { IMovie } from "../../../domain/interfaces/IMovie";
import { IMovieRepository } from "../IMovieRepository";
import { Movie } from "../../entities/Movie";

class MovieRepository implements IMovieRepository {
  constructor(private movieRepository: Repository<Movie>) {}

  async create(movie: IMovie): Promise<void> {
    await this.movieRepository.save(movie);
  }

  async findById(id: number): Promise<IMovie> {
    const movie = await this.movieRepository.findOne({
      where: {
        movieId: id,
      },
    });

    if (!movie) return null;

    return movie;
  }

  async findMovieAndItsReviewsById(id: number): Promise<Partial<IMovie>> {
    const movie = await this.movieRepository
      .createQueryBuilder("movie")
      .where("movie.movieId = :id", { id })
      .leftJoinAndSelect("movie.reviews", "review")
      .leftJoinAndSelect("review.user", "user")
      .getOne();

    if (!movie) return null;

    return movie;
  }

  async listAll(
    offset: number,
    limit: number,
  ): Promise<{
    totalItems: number;
    movies: Partial<IMovie>[];
  }> {
    const [movies, totalItems] = await this.movieRepository.findAndCount({
      skip: offset,
      take: limit,
      relations: ["reviews"],
      select: ["movieId", "title", "category", "image", "year"],
    });

    return {
      totalItems,
      movies,
    };
  }
}

export { MovieRepository };
