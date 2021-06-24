import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateTokenDto {
  /**
   * Refresh token
   * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
   */
  @IsString()
  @IsNotEmpty()
  token: string;

  /**
   * Deprecated token
   * @example false
   */
  @IsBoolean()
  @IsOptional()
  deprecated?: boolean;
}
