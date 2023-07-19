import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@Auth/guards/';
import { CorrectIdGuard } from '@Users/guards';
import { IdParamDto } from '@Core/dtos';

import { ChangePasswordDto, EmailDto, ResetPasswordDto } from '../dto/';
import { AccountService } from '../services/';

@ApiTags('Account management endpoints')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('password/forgot')
  async sendEmail(@Body() emailDto: EmailDto) {
    return await this.accountService.forgotPassword(emailDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('password/reset')
  resetPassword(
    @Query() idDto: IdParamDto,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.accountService.resetPassword(idDto, resetPasswordDto);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, CorrectIdGuard)
  @Put('password/change/:id')
  changePassword(
    @Param() idDto: IdParamDto,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.accountService.changePassword(idDto, changePasswordDto);
  }
}
