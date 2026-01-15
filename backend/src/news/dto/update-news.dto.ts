import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateNewsDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  content?: string;
}
