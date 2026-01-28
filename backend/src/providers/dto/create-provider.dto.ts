import { ArrayNotEmpty, IsArray, IsIn, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @Matches(/^\d{11}$|^\d{14}$/)
  document: string;

  @IsString()
  @IsIn(['RPA', 'MEI', 'CLT'])
  contractType: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  bankCode?: string;

  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  agency?: string;

  @IsOptional()
  @IsString()
  account?: string;

  @IsOptional()
  @IsString()
  pixType?: string;

  @IsOptional()
  @IsString()
  pixKey?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  cityIds: string[];

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
