import { Request, Response, NextFunction } from "express";
import { LoginValidator } from "../validators/loginValidator";
import { IUser } from "../../domain/interfaces/IUser";
import { ValidateData } from "../validators";

async function loginValidate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { email, password }: IUser = request.body;

  const validateData = new ValidateData();
  const loginValidator = new LoginValidator(email, password);

  const errors = await validateData.validate(loginValidator);

  if (errors.length > 0) {
    return response.status(400).json(errors);
  }

  next();
}

export { loginValidate };
