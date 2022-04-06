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
import { JwtAuthGuard } from '../auth/strategies/jwt/jwt-auth.guard';
import { IdDto } from '../users/dto/id.dto';
import { CorrectIdGuard } from '../users/guards/correct-id.guard';
import { AccountService } from './account.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { EmailDto } from './dto/email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('forgot-password')
  async sendEmail(@Body() emailDto: EmailDto) {
    await this.accountService.forgotPassword(emailDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('password')
  changePass(
    @Query() idDto: IdDto,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.accountService.resetPassword(idDto, resetPasswordDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, CorrectIdGuard)
  @Put('password/:id')
  changePassword(
    @Param() idDto: IdDto,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.accountService.changePassword(idDto, changePasswordDto);
  }
}
