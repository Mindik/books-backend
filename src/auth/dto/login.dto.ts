import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  /**
   * Email
   * @example dev@gcsoft.ru
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
  @MaxLength(20)
  password: string;
}
