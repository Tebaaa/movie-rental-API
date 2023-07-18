import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

// import { MailService } from '@Mail/services';
import { IdParamDto } from '@Core/dtos';
import { User } from '@Users/entities';

import { ChangePasswordDto, EmailDto, ResetPasswordDto } from '../dto/';

@Injectable()
export class AccountService {
  constructor(
    // private mailService: MailService,
    private eventEmitter: EventEmitter2,
  ) {}

  async forgotPassword(emailDto: EmailDto) {
    const { email } = emailDto;
    const [user] = await this.eventEmitter.emitAsync(
      'users.getOneByEmail',
      email,
    );
    if (!(user instanceof User)) {
      throw new NotFoundException(`User ${email} doesn't exist`);
    }
    // return await this.mailService.sendPasswordReset(user);
  }

  //TODO: Use Bcrypt & regex
  async resetPassword(idDto: IdParamDto, resetPasswordDto: ResetPasswordDto) {
    const { newPassword, newPasswordConfirmation } = resetPasswordDto;
    const confirmationIsOk = newPassword === newPasswordConfirmation;
    const updatePassword = { password: newPassword };
    if (confirmationIsOk) {
      return await this.eventEmitter.emitAsync(
        'users.updateOne',
        idDto,
        updatePassword,
      );
    }
    throw new ConflictException('Passwords must match');
  }

  async changePassword(
    idDto: IdParamDto,
    changePasswordDto: ChangePasswordDto,
  ) {
    const [user] = await this.eventEmitter.emitAsync(
      'users.getOneById',
      idDto.id,
    );
    if (!(user instanceof User)) {
      throw new NotFoundException(`User not found`);
    }

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
        return await this.eventEmitter.emitAsync(
          'users.updateOne',
          idDto,
          updatePassword,
        );
    }
  }
}
