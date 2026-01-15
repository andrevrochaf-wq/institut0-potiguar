import { IsOptional, IsString, Length, MinLength } from 'class-validator';

export class UpdateCityDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(2, 2)
  state?: string;
}
