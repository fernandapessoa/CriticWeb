import { Response } from "express";
import { IRequest } from "../middlewares/ensureUserIsAuthenticated";
import {
  IReview as IReviewDTO,
  IReviewAndMovieIds,
} from "../../domain/interfaces/IReview";
import { ReviewRepository } from "../../data/repositories/implementations/ReviewRepository";
import { Review } from "../../data/entities/Review";
import { dataSource } from "../../data/config/dataSource";
import { CreateReviewUseCase } from "../../domain/useCases/CreateReviewUseCase";
import { errorHandler } from "../../domain/errors/errorHandler";
import { ListAllReviewsUseCase } from "../../domain/useCases/ListAllReviewsUseCase";
import { IQueryData as IQueryDataDTO } from "../../domain/interfaces/IQueryData";
import { DeleteReviewsUseCase } from "../../domain/useCases/DeleteReviewsUseCase";
import { FindReviewUseCase } from "../../domain/useCases/FindReviewUseCase";
import { MovieRepository } from "../../data/repositories/implementations/MovieRepository";
import { Movie } from "../../data/entities/Movie";
import { UpdateReviewUseCase } from "../../domain/useCases/UpdateReviewUseCase";

class ReviewController {
  async createReview(request: IRequest, response: Response) {
    try {
      let { description, rating, isLiked }: IReviewDTO = request.body;
      const { movieId }: IReviewAndMovieIds = request.params;
      const { userId } = request.user;

      isLiked = isLiked ? true : false;

      const movieRepository = new MovieRepository(
        dataSource.getRepository(Movie),
      );

      const reviewRepository = new ReviewRepository(
        dataSource.getRepository(Review),
      );

      const createReviewUseCase = new CreateReviewUseCase(
        reviewRepository,
        movieRepository,
      );

      await createReviewUseCase.execute({
        description,
        rating,
        isLiked,
        userId: Number(userId),
        movieId: Number(movieId),
      });

      return response.status(201).send();
    } catch (error) {
      const errorCaptured = errorHandler(error as string);

      return response
        .status(errorCaptured.status)
        .json({ message: errorCaptured.message });
    }
  }

  async updateReview(request: IRequest, response: Response) {
    try {
      let { description, rating, isLiked }: IReviewDTO = request.body;
      const { reviewId }: IReviewAndMovieIds = request.params;
      const { userId } = request.user;

      isLiked = isLiked ? true : false;

      const reviewRepository = new ReviewRepository(
        dataSource.getRepository(Review),
      );

      const updateReviewUseCase = new UpdateReviewUseCase(reviewRepository);

      await updateReviewUseCase.execute({
        reviewId: Number(reviewId),
        description,
        rating,
        isLiked,
        userId: Number(userId),
      });

      return response.status(204).send();
    } catch (error) {
      const errorCaptured = errorHandler(error as string);

      return response
        .status(errorCaptured.status)
        .json({ message: errorCaptured.message });
    }
  }

  async listAllReviews(request: IRequest, response: Response) {
    try {
      const { offset, limit }: IQueryDataDTO = request.query;
      let userId = null;

      const path = request.url;

      if (path == "/user-profile") userId = Number(request.user.userId);

      const reviewRepository = new ReviewRepository(
        dataSource.getRepository(Review),
      );

      const listAllReviewsUseCase = new ListAllReviewsUseCase(reviewRepository);

      const reviews = await listAllReviewsUseCase.execute(
        userId,
        offset,
        limit,
      );

      return response.status(200).json(reviews);
    } catch (error) {
      const errorCaptured = errorHandler(error as string);

      return response
        .status(errorCaptured.status)
        .json({ message: errorCaptured.message });
    }
  }
  async deleteReview(request: IRequest, response: Response) {
    try {
      const { reviewId }: IReviewAndMovieIds = request.params;
      const { userId } = request.user;
      const reviewRepository = new ReviewRepository(
        dataSource.getRepository(Review),
      );

      const deleteReviewUseCase = new DeleteReviewsUseCase(reviewRepository);
      await deleteReviewUseCase.execute(Number(reviewId), Number(userId));

      return response.status(204).send();
    } catch (error) {
      const errorCaptured = errorHandler(error as string);
      return response
        .status(errorCaptured.status)
        .json({ message: errorCaptured.message });
    }
  }

  async findReview(request: IRequest, response: Response) {
    try {
      const reviewRepository = new ReviewRepository(
        dataSource.getRepository(Review),
      );
      const { offset, limit }: IQueryDataDTO = request.query;
      const { title } = request.params;

      const findReviewUseCase = new FindReviewUseCase(reviewRepository);
      const reviews = await findReviewUseCase.execute(
        String(title),
        offset,
        limit,
      );

      return response.status(200).json(reviews);
    } catch (error) {
      const errorCaptured = errorHandler(error as string);

      return response
        .status(errorCaptured.status)
        .json({ message: errorCaptured.message });
    }
  }
}

export { ReviewController };
