import { validate } from "class-validator";
import { extractConstraintErrors } from "../utils/extractConstraintErrors";

class ValidateData {
  public async validate(classForValidaton: object) {
    const errors = await validate(classForValidaton);

    if (errors.length > 0) {
      const formattedErrors = extractConstraintErrors(errors);
      return formattedErrors;
    }

    return [];
  }
}

export { ValidateData };
