import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsBoolean()
  @IsOptional()
  banned?: boolean;
}
