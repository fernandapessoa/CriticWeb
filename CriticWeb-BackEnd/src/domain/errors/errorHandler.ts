import { IErrorsDescription, errorsDescription } from "./errors";

function errorHandler(exception: string): IErrorsDescription {
  const error = errorsDescription.find((error) => error.title == exception);
  const internalServerErroIndex = errorsDescription.length - 1;

  if (error) {
    return error;
  }

  return errorsDescription[internalServerErroIndex];
}

export { errorHandler };
