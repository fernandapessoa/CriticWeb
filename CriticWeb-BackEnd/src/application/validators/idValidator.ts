import { IsInt, Min, ValidationArguments } from "class-validator";

class IdValidator {
  @IsInt({
    message: (validationArguments: ValidationArguments) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const idName = (validationArguments.object as any)?.idName;
      return `Invalid field ${idName}. It must be a number.`;
    },
  })
  @Min(1, {
    message: (validationArguments: ValidationArguments) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const idName = (validationArguments.object as any)?.idName;
      return `Field ${idName} must be no less than 1.`;
    },
  })
  id: number;

  constructor(
    id: number,
    private readonly idName: string,
  ) {
    this.id = id;
  }
}

export { IdValidator };
