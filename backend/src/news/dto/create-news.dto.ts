import { IsString, MinLength } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(2)
  content: string;
}
