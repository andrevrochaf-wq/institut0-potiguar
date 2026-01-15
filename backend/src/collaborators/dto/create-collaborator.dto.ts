import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCollaboratorDto {
  @IsString()
  @MinLength(2)
  fullName: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  rg?: string;

  @IsOptional()
  @IsString()
  bankAgency?: string;

  @IsOptional()
  @IsString()
  bankAccount?: string;

  @IsOptional()
  @IsString()
  addressFull?: string;

  @IsOptional()
  @IsString()
  cityId?: string;
}
