import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateApsDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  active?: boolean;
}
