import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateEstablishmentClassDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Matutino', 'Vespertino', 'Noturno'])
  shift?: string;

  @IsOptional()
  @IsString()
  students?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
