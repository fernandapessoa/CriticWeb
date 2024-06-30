import { IReviewRepository } from "../../data/repositories/IReviewRepository";
import { Errors } from "../errors/errors";
import { IReview } from "../interfaces/IReview";

class UpdateReviewUseCase {
  constructor(private reviewRepository: IReviewRepository) {}

  async execute(review: IReview): Promise<void> {
    const isReviewFound = await this.reviewRepository.findReviewById(
      review.reviewId,
    );

    if (!isReviewFound) {
      throw Errors.REVIEW_NOT_FOUND;
    }

    if (review.userId !== isReviewFound.userId) {
      throw Errors.ACTION_NOT_AUTHORIZED;
    }

    await this.reviewRepository.update(review);

    return;
  }
}

export { UpdateReviewUseCase };
