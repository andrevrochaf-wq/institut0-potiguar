import { IsString, Length, MinLength } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @Length(2, 2)
  state: string;
}
