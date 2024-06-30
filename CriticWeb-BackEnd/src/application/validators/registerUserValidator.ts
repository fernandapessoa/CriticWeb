import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { IUser } from "../../domain/interfaces/IUser";
import { IConstraintError } from "../utils/extractConstraintErrors";

class RegisterUserValidator {
  @IsNotEmpty({ message: "Field name cannot be empty." })
  @Length(8, 20, {
    message:
      "Invalid field name. It must be at least 8 characters and at most 20.",
  })
  @IsString({ message: "Invalid field name. It must be a string." })
  name: string;

  @IsNotEmpty({ message: "Field email cannot be empty." })
  @IsEmail({}, { message: "Invalid field email. It must be a valid email." })
  email: string;

  @IsNotEmpty({ message: "Field password cannot be empty." })
  @Length(8, 20, {
    message:
      "Invalid field password. It must be at least 8 characters and at most 20.",
  })
  @IsString({ message: "Invalid field password. It must be a string" })
  password: string;

  @IsNotEmpty({ message: "Field confirmPassword cannot be empty." })
  @Length(8, 20, {
    message:
      "Invalid field confirmPassword. It must be at least 8 characters and at most 20.",
  })
  @IsString({ message: "Invalid field confirmPassword. It must be a string" })
  confirmPassword: string;

  constructor(data: IUser) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.confirmPassword = data.confirmPassword!;
  }

  validatePasswordsMatch(): IConstraintError | null {
    if (this.password !== this.confirmPassword) {
      return {
        message: "Invalid field confirmPassword. It must be equal to password.",
      };
    }

    return null;
  }
}

export { RegisterUserValidator };
