import { IsNotEmpty, IsEmail } from "class-validator";

class LoginValidator {
  @IsNotEmpty({ message: "Field email cannot be empty." })
  @IsEmail({}, { message: "Invalid field email. It must be a valid email." })
  email: string;

  @IsNotEmpty({ message: "Field password cannot be empty." })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export { LoginValidator };
