import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  title: string;

  @IsString()
  amount: string;

  @IsInt()
  @Min(1)
  @Max(12)
  competencyMonth: number;

  @IsInt()
  @Min(2000)
  @Max(2100)
  competencyYear: number;
}
