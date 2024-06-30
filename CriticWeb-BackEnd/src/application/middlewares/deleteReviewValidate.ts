import { Request, Response, NextFunction } from "express";
import { DeleteReviewValidator } from "../validators/deleteReviewValidator";
import { validate } from "class-validator";

async function deleteReviewValidate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { reviewId, userId } = request.params;

  const deleteReviewValidator = new DeleteReviewValidator({
    reviewId: Number(reviewId),
    userId: Number(userId),
  });

  const errors = await validate(deleteReviewValidator);

  if (errors.length > 0) {
    return response.status(400).json(errors);
  }

  next();
}

export { deleteReviewValidate };
