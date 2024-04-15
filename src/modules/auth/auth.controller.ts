import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user-dto';

@Controller('/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth')
  async login(@Body() authUserDto: AuthUserDto) {
    return this.authService.login(authUserDto);
  }
}
