import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  /**
   * Email
   * @example example@example.com
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Password
   * @example password
   */
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
