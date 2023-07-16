import { ConflictException, Injectable } from '@nestjs/common';
import { MailService } from '../../mail/services/mail.service';
import { IdDto } from '../../users/dto/id.dto';
import { UsersService } from '../../users/services/users.service';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { EmailDto } from '../dto/email.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Injectable()
export class AccountService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

  async forgotPassword(emailDto: EmailDto) {
    const user = await this.usersService.findByEmail(emailDto.email);
    return await this.mailService.sendPasswordReset(user);
  }

  //TODO: Use Bcrypt & regex
  async resetPassword(idDto: IdDto, resetPasswordDto: ResetPasswordDto) {
    const { newPassword, newPasswordConfirmation } = resetPasswordDto;
    const confirmationIsOk = newPassword === newPasswordConfirmation;
    const updatePassword = { password: newPassword };
    if (confirmationIsOk) {
      return this.usersService.update(idDto, updatePassword);
    }
    throw new ConflictException('Passwords must match');
  }

  async changePassword(idDto: IdDto, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findById(idDto);
    const { oldPassword, newPassword, newPasswordConfirmation } =
      changePasswordDto;
    const correctOldPassword = user.password === oldPassword;
    const equalNewPassword = newPassword === newPasswordConfirmation;
    const oldPasswordEqualNewPassword = newPassword === oldPassword;
    const updatePassword = { password: newPassword };
    switch (true) {
      case !correctOldPassword:
        throw new ConflictException('Incorrect old password');
      case !equalNewPassword:
        throw new ConflictException('Your new password must match');
      case oldPasswordEqualNewPassword:
        throw new ConflictException(
          'Your new password must be different from the old one',
        );
      default:
        return this.usersService.update(idDto, updatePassword);
    }
  }
}
