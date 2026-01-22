import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.requestPasswordReset(body.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body.token, body.password);
  }
}
