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
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@Auth/guards/';
import { CorrectIdGuard } from '@Users/guards';
import { IdParamDto } from '@Core/dtos';

import { ChangePasswordDto, EmailDto, ResetPasswordDto } from '../dto/';
import { AccountService } from '../services/';

@ApiTags('Account management endpoints')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  //TODO: Review return type
  @ApiOperation({
    summary: 'Send email to reset password',
    description:
      'Use this endpoint to send an email to the specified account with instructions to reset its password',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Put('password/forgot')
  async sendEmail(@Body() emailDto: EmailDto) {
    return await this.accountService.forgotPassword(emailDto);
  }

  @ApiOperation({
    summary: 'Create a new password',
    description: 'Use this endpoint to create a new password',
  })
  @ApiAcceptedResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('password/reset')
  resetPassword(
    @Query() idDto: IdParamDto,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.accountService.resetPassword(idDto, resetPasswordDto);
  }

  @ApiOperation({
    summary: 'Change password',
    description: 'Use this endpoint to change your old password for a new one',
  })
  @ApiAcceptedResponse({ status: HttpStatus.NO_CONTENT })
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
