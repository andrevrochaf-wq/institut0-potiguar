import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateContractDto {
  @IsString()
  collaboratorId: string;

  @IsString()
  cityId: string;

  @IsString()
  bankName: string;

  @IsString()
  @IsIn(['RPA', 'MEI', 'CLT'])
  contractType: string;

  @IsOptional()
  @IsString()
  templateId?: string;

  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsString()
  amount: string;
}
