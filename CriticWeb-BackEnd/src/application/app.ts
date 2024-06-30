import express from "express";
import { routes } from "./routes";

import cors from "cors";

import "reflect-metadata";

import swaggerUI from "swagger-ui-express";
import swaggerDocs from "./docs/swagger.json";

import dotenv from "dotenv";

const app = express();

dotenv.config({ path: "./.env" });

const corsOptions = {
  origin: process.env.FRONT_END_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/criticweb/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/criticweb", routes);

export { app };
