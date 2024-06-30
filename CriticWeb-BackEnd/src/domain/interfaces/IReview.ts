import { IMovie } from "./IMovie";

interface IReview {
  reviewId?: number;
  description: string;
  rating: number;
  isLiked: boolean;
  userId?: number;
  reviewer?: string;
  user?: {
    name: string;
  };
  movieId?: number;
  movie?: Partial<IMovie>;
}

interface IReviewAndMovieIds {
  movieId?: string;
  reviewId?: string;
}

export { IReview, IReviewAndMovieIds };
