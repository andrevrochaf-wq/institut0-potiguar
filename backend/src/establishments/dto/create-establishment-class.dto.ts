import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateEstablishmentClassDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsIn(['Manha', 'Tarde', 'Noite', 'Integral'])
  shift: string;

  @IsString()
  students: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
