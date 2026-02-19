import { IsString, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { StreamType } from '../../entities/stream.entity';

export class CreateStreamDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsEnum(StreamType)
  type?: StreamType;

  @IsOptional()
  @IsString()
  topic?: string;
}
