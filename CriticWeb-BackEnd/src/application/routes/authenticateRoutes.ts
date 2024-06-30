import express from "express";
import { AuthenticateController } from "../controllers/AuthenticateController";
import { userValidate } from "../middlewares/userValidate";
import { loginValidate } from "../middlewares/loginValidate";

const authenticateRoutes = express.Router();

const authenticateController = new AuthenticateController();

authenticateRoutes.post(
  "/register",
  userValidate,
  authenticateController.register,
);
authenticateRoutes.post("/login", loginValidate, authenticateController.login);

export { authenticateRoutes };
