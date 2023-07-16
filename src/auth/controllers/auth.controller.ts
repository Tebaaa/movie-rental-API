import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/';
import { LocalAuthGuard } from '../guards/';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //TODO: create logout endpoint

  //TODO: create refresh token endpoint
}
