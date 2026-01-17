import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  fullName: string;

  @IsString()
  @MinLength(8, { message: 'Senha deve ter no minimo 8 caracteres.' })
  @Matches(/[A-Z]/, { message: 'Senha deve conter ao menos uma letra maiuscula.' })
  @Matches(/\d/, { message: 'Senha deve conter ao menos um numero.' })
  password: string;
}
