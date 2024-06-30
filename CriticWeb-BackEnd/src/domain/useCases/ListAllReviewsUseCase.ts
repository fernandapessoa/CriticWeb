import { IReviewRepository } from "../../data/repositories/IReviewRepository";
import { IReview } from "../interfaces/IReview";

class ListAllReviewsUseCase {
  constructor(private reviewRepository: IReviewRepository) {}

  async execute(
    userId: number | null,
    offset: number,
    limit: number,
  ): Promise<{
    totalItems: number;
    currentPage: number;
    limit: number;
    totalPages: number;
    items: IReview[];
  }> {
    offset = offset ? Number(offset) : 0;
    limit = limit ? Number(limit) : 10;

    const { totalItems, reviews } = await this.reviewRepository.listAll(
      userId,
      offset,
      limit,
    );

    let reviewsFormatted: IReview[];

    if (reviews && reviews.length > 0) {
      reviewsFormatted = reviews.map((review) => ({
        reviewId: review.reviewId,
        description: review.description,
        rating: review.rating,
        isLiked: review.isLiked,
        reviewer: review.user.name,
        movie: {
          title: review.movie.title,
          category: review.movie.category,
          image: review.movie.image,
        },
      }));
    }

    return {
      totalItems,
      currentPage: Math.floor(offset / limit) + 1,
      limit,
      totalPages: Math.ceil(totalItems / limit),
      items: reviewsFormatted.length > 0 ? reviewsFormatted : reviews,
    };
  }
}

export { ListAllReviewsUseCase };
