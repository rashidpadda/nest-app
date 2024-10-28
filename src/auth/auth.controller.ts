import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  
  signUp(@Body() SignupDto: SignupDto): Promise<{ token: string }> {
    return this.authService.signup(SignupDto);
  }

  @Get('login')
  login(@Body() LoginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(LoginDto);
  }
}
  