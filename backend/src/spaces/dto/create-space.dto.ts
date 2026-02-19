import { IsString, MinLength, MaxLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateSpaceDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  is_private?: boolean;

  @IsOptional()
  @IsString()
  theme_color?: string;
}
