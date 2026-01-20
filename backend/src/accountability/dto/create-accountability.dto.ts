import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateAccountabilityDto {
  @IsString()
  title: string;

  @IsString()
  cityId: string;

  @IsString()
  projectId: string;

  @IsString()
  @IsIn(['education', 'social_assistance'])
  secretariatType: string;

  @IsString()
  responsibleName: string;

  @IsOptional()
  @IsString()
  objectDescription?: string;

  @IsInt()
  @Min(1)
  @Max(12)
  competencyMonth: number;

  @IsInt()
  @Min(2000)
  @Max(2100)
  competencyYear: number;
}
