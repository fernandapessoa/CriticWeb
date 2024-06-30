import { NextFunction, Request, Response } from "express";
import { RegisterUserValidator } from "../validators/registerUserValidator";
import { ValidateData } from "../validators";
import { IUser } from "../../domain/interfaces/IUser";

async function userValidate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { name, email, password, confirmPassword }: IUser = request.body;

  const validateData = new ValidateData();
  const registerUserValidator = new RegisterUserValidator({
    name,
    email,
    password,
    confirmPassword,
  });

  const errors = await validateData.validate(registerUserValidator);
  const isPasswordsDifferent = registerUserValidator.validatePasswordsMatch();

  if (isPasswordsDifferent) {
    errors.push(isPasswordsDifferent);
  }

  if (errors.length > 0) {
    return response.status(400).json(errors);
  }

  next();
}

export { userValidate };
