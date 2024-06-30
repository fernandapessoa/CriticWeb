import { IsOptional, IsInt, Min, Max } from "class-validator";
import { IQueryData } from "../../domain/interfaces/IQueryData";

class QueryValidator {
  @IsOptional()
  @IsInt({ message: "Invalid field offset. It must be a number." })
  @Min(1, { message: "Invalid fiield offset. It must be no less than 1." })
  @Max(250, {
    message: "Invalid field offset. It must be no greater than 250.",
  })
  offset: number;

  @IsOptional()
  @IsInt({ message: "Invalid field limit. It must be a number." })
  @Min(1, { message: "Invalid field limit. It must be no less than 1." })
  @Max(250, { message: "Invalid field limit. It must be no greater than 250." })
  limit: number;

  constructor(data: IQueryData) {
    this.offset = data.offset;
    this.limit = data.limit;
  }
}

export { QueryValidator };
