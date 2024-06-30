import { Response } from "express";
import { IMovie } from "../../domain/interfaces/IMovie";
import { MovieRepository } from "../../data/repositories/implementations/MovieRepository";
import { dataSource } from "../../data/config/dataSource";
import { Movie } from "../../data/entities/Movie";
import { CreateMovieUseCase } from "../../domain/useCases/CreateMovieUseCase";
import { IRequest } from "../middlewares/ensureUserIsAuthenticated";
import { errorHandler } from "../../domain/errors/errorHandler";
import { ListAllMoviesUseCase } from "../../domain/useCases/ListAllMoviesUseCase";
import { IQueryData as IQueryDataDTO } from "../../domain/interfaces/IQueryData";
import { IReviewAndMovieIds } from "../../domain/interfaces/IReview";
import { FindMovieAndItsReviewsUseCase } from "../../domain/useCases/FindMovieAndItsReviewsUseCase";

class MovieController {
  async createMovie(request: IRequest, response: Response) {
    try {
      const { title, category, image, description, year }: IMovie =
        request.body;

      const movieRepository = new MovieRepository(
        dataSource.getRepository(Movie),
      );

      const createMovieUseCase = new CreateMovieUseCase(movieRepository);

      await createMovieUseCase.execute({
        title,
        category,
        image,
        description,
        year,
      });

      return response.status(201).send();
    } catch (error) {
      const errorCaptured = errorHandler(error as string);

      return response
        .status(errorCaptured.status)
        .json({ message: errorCaptured.message });
    }
  }

  async listAllMovies(request: IRequest, response: Response) {
    try {
      const { offset, limit }: IQueryDataDTO = request.query;

      const movieRepository = new MovieRepository(
        dataSource.getRepository(Movie),
      );

      const listAllMoviesUseCase = new ListAllMoviesUseCase(movieRepository);

      const movies = await listAllMoviesUseCase.execute(offset, limit);

      return response.status(200).json(movies);
    } catch (error) {
      const errorCaptured = errorHandler(error as string);

      return response
        .status(errorCaptured.status)
        .json({ message: errorCaptured.message });
    }
  }

  async findMovieAndItsReviews(request: IRequest, response: Response) {
    try {
      const { movieId }: IReviewAndMovieIds = request.params;

      const movieRepository = new MovieRepository(
        dataSource.getRepository(Movie),
      );

      const findMovieAndItsReviews = new FindMovieAndItsReviewsUseCase(
        movieRepository,
      );

      const movie = await findMovieAndItsReviews.execute(Number(movieId));

      return response.status(200).json(movie);
    } catch (error) {
      const errorCaptured = errorHandler(error as string);

      return response
        .status(errorCaptured.status)
        .json({ message: errorCaptured.message });
    }
  }
}

export { MovieController };
