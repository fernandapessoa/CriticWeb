import { IReview } from "../../domain/interfaces/IReview";

interface IReviewRepository {
  create(review: IReview): Promise<void>;
  listAll(
    userId: number | null,
    offset: number,
    limit: number,
  ): Promise<{
    totalItems: number;
    reviews: IReview[];
  }>;
  update(review: IReview): Promise<void>;
  delete(reviewId: number): Promise<void>;
  findReview(
    title: string,
    offset: number,
    limit: number,
  ): Promise<{
    totalItems: number;
    reviews: IReview[];
  }>;
  findReviewById(reviewId: number): Promise<IReview | null>;
}

export { IReviewRepository };
