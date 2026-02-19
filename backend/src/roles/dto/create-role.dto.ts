import { IsString, MinLength, MaxLength, IsOptional, IsObject } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsObject()
  permissions?: Record<string, boolean>;
}
