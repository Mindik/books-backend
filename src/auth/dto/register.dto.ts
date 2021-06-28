import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from '../../common/decorators/match.decorators';

export class RegisterDto {
  /**
   * Email
   * @example dev@gcsoft.ru
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Name user
   * @example John Doe
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  /**
   * Password
   * @example password
   */
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  /**
   * Confirm password
   * @example password
   */
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Match('password', {
    message: 'Password mismatch',
  })
  passwordConfirm: string;
}
