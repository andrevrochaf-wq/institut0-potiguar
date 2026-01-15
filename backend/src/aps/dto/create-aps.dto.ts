import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateApsDto {
  @IsString()
  @MinLength(3)
  code: string;

  @IsString()
  @MinLength(2)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
