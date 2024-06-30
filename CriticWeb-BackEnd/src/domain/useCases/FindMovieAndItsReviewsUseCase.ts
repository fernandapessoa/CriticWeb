import { IMovieRepository } from "../../data/repositories/IMovieRepository";
import { Errors } from "../errors/errors";
import { IMovie } from "../interfaces/IMovie";

class FindMovieAndItsReviewsUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(id: number): Promise<Partial<IMovie>> {
    const movie = await this.movieRepository.findMovieAndItsReviewsById(id);

    if (!movie) {
      throw Errors.NO_MOVIE_FOUND;
    }

    if (movie.reviews && movie.reviews.length > 0) {
      movie.reviews = movie.reviews.map((review) => ({
        description: review.description,
        isLiked: review.isLiked,
        rating: review.rating,
        reviewer: review.user.name,
      }));
    }

    let totalRating = 0;
    let averageRating = 0;

    if (movie.reviews && movie.reviews.length > 0) {
      totalRating = movie.reviews.reduce(
        (sum, review) => sum + review.rating,
        0,
      );
      averageRating = totalRating / movie.reviews.length;
    }

    movie.rating = averageRating;

    return movie;
  }
}

export { FindMovieAndItsReviewsUseCase };
