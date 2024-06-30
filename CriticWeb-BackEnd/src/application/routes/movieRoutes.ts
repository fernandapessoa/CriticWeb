import express from "express";
import { MovieController } from "../controllers/MovieController";
import { movieValidate } from "../middlewares/movieValidate";
import { queryValidate } from "../middlewares/queryValidate";
import { idValidate } from "../middlewares/idValidate";

const movieRoutes = express.Router();

const movieController = new MovieController();

movieRoutes.post("/", movieValidate, movieController.createMovie);
movieRoutes.get("/", queryValidate, movieController.listAllMovies);
movieRoutes.get(
  "/:movieId",
  idValidate,
  movieController.findMovieAndItsReviews,
);

export { movieRoutes };
