import { IsString, MinLength } from 'class-validator';

export class CreateEstablishmentStageDto {
  @IsString()
  @MinLength(2)
  name: string;
}
