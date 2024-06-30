import { IMovieRepository } from "../../data/repositories/IMovieRepository";
import { Errors } from "../errors/errors";
import { IMovie } from "../interfaces/IMovie";

class ListAllMoviesUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(
    offset: number,
    limit: number,
  ): Promise<{
    totalItems: number;
    currentPage: number;
    limit: number;
    totalPages: number;
    items: Partial<IMovie>[];
  }> {
    offset = offset ? Number(offset) : 0;
    limit = limit ? Number(limit) : 10;

    const { totalItems, movies } = await this.movieRepository.listAll(
      offset,
      limit,
    );

    if (!totalItems) {
      throw Errors.NO_MOVIE_FOUND;
    }

    const moviesWithoutReviews: Partial<IMovie>[] = movies.map((movie) => {
      let totalRating = 0;
      let averageRating = 0;

      if (movie.reviews && movie.reviews.length > 0) {
        totalRating = movie.reviews.reduce(
          (sum, review) => sum + review.rating,
          0,
        );
        averageRating = totalRating / movie.reviews.length;
      }

      return {
        movieId: movie.movieId,
        title: movie.title,
        category: movie.category,
        image: movie.image,
        description: movie.description,
        rating: averageRating,
        year: movie.year,
      };
    });

    return {
      totalItems,
      currentPage: Math.floor(offset / limit) + 1,
      limit,
      totalPages: Math.ceil(totalItems / limit),
      items: moviesWithoutReviews,
    };
  }
}

export { ListAllMoviesUseCase };
