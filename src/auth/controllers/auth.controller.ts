import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ReqUser } from '@Core/decorators';
import { ICurrentUser } from '@Core/interfaces';

import { AuthService } from '../services/';
import { LocalAuthGuard } from '../guards/';
import { LoginDto } from '../dto';

@ApiTags('Authentication endpoints')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    description: 'User this endpoint to authenticate',
    summary: 'Login',
  })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@ReqUser() user: ICurrentUser) {
    console.log(user);
    return this.authService.login(user);
  }

  //TODO: create logout endpoint

  //TODO: create refresh token endpoint
}
