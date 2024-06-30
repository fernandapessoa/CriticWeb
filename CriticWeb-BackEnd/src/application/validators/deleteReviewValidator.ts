import { IsInt, Min } from "class-validator";

class DeleteReviewValidator {
  @IsInt({ message: "Invalid reviewId. It must be a number." })
  @Min(1, {
    message: "Invalid reviewId. It must be greater than or equal to 1.",
  })
  reviewId: number;

  @IsInt({ message: "Invalid userId. It must be a number." })
  @Min(1, { message: "Invalid userId. It must be greater than or equal to 1." })
  userId: number;

  constructor(data: { reviewId: number; userId: number }) {
    this.reviewId = data.reviewId;
    this.userId = data.userId;
  }
}

export { DeleteReviewValidator };
