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

import { JwtAuthGuard } from '@Auth/guards/';
import { CorrectIdGuard } from '@Users/guards';
import { IdParamDto } from '@Core/dtos';

import { ChangePasswordDto, EmailDto, ResetPasswordDto } from '../dto/';
import { AccountService } from '../services/';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('forgot-password')
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
