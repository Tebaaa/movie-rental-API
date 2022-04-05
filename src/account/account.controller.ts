import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { IdDto } from '../users/dto/id.dto';
import { AccountService } from './account.service';
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

  @Put('password')
  changePass(
    @Query() idDto: IdDto,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.accountService.resetPassword(idDto, resetPasswordDto);
  }
}
