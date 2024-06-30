import { Request, Response, NextFunction } from "express";
import {
  IReview as IReviewDTO,
  IReviewAndMovieIds,
} from "../../domain/interfaces/IReview";
import { ReviewDataValidator } from "../validators/reviewDataValidator";
import { ValidateData } from "../validators";

async function reviewValidate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  let { description, rating, isLiked }: IReviewDTO = request.body;
  const { movieId }: IReviewAndMovieIds = request.params;

  const validateData = new ValidateData();

  // This is a fake id to pass validation when validating data to update a review. It will not bet set after validation is completed, in this case.
  const fakeMovieId = 1;

  const reviewValidator = new ReviewDataValidator({
    description,
    rating,
    isLiked,
    movieId: movieId ? Number(movieId) : fakeMovieId,
  });

  const errors = await validateData.validate(reviewValidator);

  if (errors.length > 0) {
    return response.status(400).json(errors);
  }

  next();
}

export { reviewValidate };
