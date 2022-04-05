import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/users.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendPasswordReset(user: User) {
    const host = process.env.SERVER_HOST;
    const port = process.env.SERVER_PORT;
    const userId = user.id;
    const url = `${host}:${port}/account/password?=id=${userId}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password reset',
      template: 'reset-password',
      context: {
        url,
        url2: url,
      },
    });
  }
}
