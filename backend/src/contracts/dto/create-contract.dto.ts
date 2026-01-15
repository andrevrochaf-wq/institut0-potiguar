import { IsOptional, IsString } from 'class-validator';

export class CreateContractDto {
  @IsString()
  collaboratorId: string;

  @IsOptional()
  @IsString()
  templateId?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  amount?: string;
}
