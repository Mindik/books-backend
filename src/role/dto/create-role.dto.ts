import { IsString } from 'class-validator';

export class CreateRoleDto {
  /**
   * Value role
   * @example ADMIN
   */
  @IsString()
  value: string;

  /**
   * Description value
   * @example 'Администратор приложения'
   */
  @IsString()
  description: string;
}
