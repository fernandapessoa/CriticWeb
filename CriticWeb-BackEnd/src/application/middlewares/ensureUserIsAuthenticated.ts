import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../utils/auth";

interface IPayload {
  sub: string;
}

interface IRequest extends Request {
  user?: {
    userId: string;
  };
}

async function ensureUserIsAuthenticated(
  request: IRequest,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({ message: "Token missing." });
    }

    const [, token] = authHeader.split(" ");

    const { sub: userId } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      userId: userId,
    };

    return next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token." });
  }
}

export { ensureUserIsAuthenticated, IRequest };
