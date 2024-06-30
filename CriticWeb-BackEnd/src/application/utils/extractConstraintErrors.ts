import { ValidationError } from "class-validator";

interface IConstraintError {
  message: string;
}

function extractConstraintErrors(
  errors: ValidationError[],
): IConstraintError[] {
  const constraintErrors: IConstraintError[] = [];

  errors.forEach((obj) => {
    const { constraints } = obj;
    if (constraints) {
      const errorKeys = Object.keys(constraints);
      errorKeys.forEach((key) => {
        constraintErrors.push({ message: constraints[key] });
      });
    }
  });

  return constraintErrors;
}

export { extractConstraintErrors, IConstraintError };
