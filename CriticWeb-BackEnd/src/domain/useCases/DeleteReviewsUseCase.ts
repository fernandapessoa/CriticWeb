import { IReviewRepository } from "../../data/repositories/IReviewRepository";
import { Errors } from "../errors/errors";

export class DeleteReviewsUseCase {
  constructor(private reviewRepository: IReviewRepository) {}

  async execute(reviewId: number, userId: number): Promise<void> {
    const review = await this.reviewRepository.findReviewById(reviewId);

    if (!review) {
      throw Errors.REVIEW_NOT_FOUND;
    }

    if (review.userId !== userId) {
      throw Errors.ACTION_NOT_AUTHORIZED;
    }

    await this.reviewRepository.delete(reviewId);

    return;
  }
}
