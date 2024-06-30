import { Request, Response, NextFunction } from "express";
import { ValidateData } from "../validators";
import { IReviewAndMovieIds } from "../../domain/interfaces/IReview";
import { IdValidator } from "../validators/idValidator";

async function idValidate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { movieId }: IReviewAndMovieIds = request.params;
  const { reviewId }: IReviewAndMovieIds = request.params;

  let idName: string;
  let idValue: number;

  if (movieId) {
    idName = "movieId";
    idValue = Number(movieId);
  } else {
    idName = "reviewId";
    idValue = Number(reviewId);
  }

  if (idValue) idValue = Number(idValue);

  const validateData = new ValidateData();

  const idValidator = new IdValidator(idValue, idName);

  const errors = await validateData.validate(idValidator);

  if (errors.length > 0) {
    return response.status(400).json(errors);
  }

  next();
}

export { idValidate };
