import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateEstablishmentDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  inepCode?: string;

  @IsOptional()
  @IsString()
  cityId?: string;
}
