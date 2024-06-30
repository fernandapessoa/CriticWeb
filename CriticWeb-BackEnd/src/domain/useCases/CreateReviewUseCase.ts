import { IMovieRepository } from "../../data/repositories/IMovieRepository";
import { IReviewRepository } from "../../data/repositories/IReviewRepository";
import { Errors } from "../errors/errors";
import { IReview } from "../interfaces/IReview";

class CreateReviewUseCase {
  constructor(
    private reviewRepository: IReviewRepository,
    private movieRepository: IMovieRepository,
  ) {}

  async execute(review: IReview): Promise<void> {
    const istMovieNotFound = await this.movieRepository.findById(
      review.movieId,
    );

    if (!istMovieNotFound) {
      throw Errors.NO_MOVIE_FOUND;
    }

    await this.reviewRepository.create(review);

    return;
  }
}

export { CreateReviewUseCase };
