import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateAccountabilityDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  secretariatId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  competencyMonth?: number;

  @IsOptional()
  @IsInt()
  @Min(2000)
  @Max(2100)
  competencyYear?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
