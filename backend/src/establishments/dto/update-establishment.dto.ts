import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateEstablishmentDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  inepCode?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
