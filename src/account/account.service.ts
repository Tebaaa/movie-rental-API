import { ConflictException, Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { IdDto } from '../users/dto/id.dto';
import { UsersService } from '../users/users.service';
import { EmailDto } from './dto/email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AccountService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

  async forgotPassword(emailDto: EmailDto) {
    const user = await this.usersService.findByEmail(emailDto.email);
    await this.mailService.sendPasswordReset(user);
  }

  async resetPassword(idDto: IdDto, resetPasswordDto: ResetPasswordDto) {
    const { newPassword, newPasswordConfirmation } = resetPasswordDto;
    const confirmationIsOk = newPassword === newPasswordConfirmation;
    const updatePassword = { password: newPassword };
    if (confirmationIsOk) {
      return this.usersService.update(idDto, updatePassword);
    }
    throw new ConflictException('Passwords must match');
  }
}
