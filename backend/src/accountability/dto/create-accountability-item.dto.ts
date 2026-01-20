import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateAccountabilityItemDto {
  @IsString()
  apsId: string;

  @IsNumberString()
  amount: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
