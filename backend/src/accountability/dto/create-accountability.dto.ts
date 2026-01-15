import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateAccountabilityDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  secretariatId?: string;

  @IsInt()
  @Min(1)
  @Max(12)
  competencyMonth: number;

  @IsInt()
  @Min(2000)
  @Max(2100)
  competencyYear: number;
}
