import { Request, Response, NextFunction } from "express";
import { ValidateData } from "../validators";
import { IQueryData as IQueryDataDTO } from "../../domain/interfaces/IQueryData";
import { QueryValidator } from "../validators/queryValidator";

async function queryValidate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { offset, limit }: IQueryDataDTO = request.query;

  const validateData = new ValidateData();

  const queryValidator = new QueryValidator({
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  const errors = await validateData.validate(queryValidator);

  if (errors.length > 0) {
    return response.status(400).json(errors);
  }

  next();
}

export { queryValidate };
