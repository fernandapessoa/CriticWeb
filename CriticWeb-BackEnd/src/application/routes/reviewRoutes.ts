import express from "express";
import { ReviewController } from "../controllers/ReviewController";
import { reviewValidate } from "../middlewares/reviewValidate";
import { queryValidate } from "../middlewares/queryValidate";
import { idValidate } from "../middlewares/idValidate";

const reviewRoutes = express.Router();
const reviewController = new ReviewController();

reviewRoutes.post("/:movieId", reviewValidate, reviewController.createReview);
reviewRoutes.get("/", queryValidate, reviewController.listAllReviews);
reviewRoutes.get(
  "/user-profile",
  queryValidate,
  reviewController.listAllReviews,
);
reviewRoutes.get("/:title", reviewController.findReview);
reviewRoutes.put(
  "/:reviewId",
  idValidate,
  reviewValidate,
  reviewController.updateReview,
);
reviewRoutes.delete("/:reviewId", idValidate, reviewController.deleteReview);

export { reviewRoutes };
