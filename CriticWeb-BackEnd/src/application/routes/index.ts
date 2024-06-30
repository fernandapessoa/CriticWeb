import express from "express";
import { authenticateRoutes } from "./authenticateRoutes";
import { movieRoutes } from "./movieRoutes";
import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";
import { reviewRoutes } from "./reviewRoutes";

const routes = express.Router();

routes.use("/authenticate", authenticateRoutes);
routes.use("/movie", ensureUserIsAuthenticated, movieRoutes);
routes.use("/review", ensureUserIsAuthenticated, reviewRoutes);

export { routes };
