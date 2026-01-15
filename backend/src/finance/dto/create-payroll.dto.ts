import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreatePayrollDto {
  @IsInt()
  @Min(1)
  @Max(12)
  competencyMonth: number;

  @IsInt()
  @Min(2000)
  @Max(2100)
  competencyYear: number;

  @IsString()
  total: string;
}
