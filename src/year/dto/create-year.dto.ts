import { IsString } from 'class-validator';

export class CreateYearDto {
  /**
   * Year
   * @example 2020
   */
  @IsString()
  value: string;
}
