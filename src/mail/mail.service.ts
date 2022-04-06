import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OrderInfo } from '../movie-rental/classes/order-info.class';
import { User } from '../users/entities/users.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  host = process.env.SERVER_HOST;
  port = process.env.SERVER_PORT;

  async sendPasswordReset(user: User) {
    const userId = user.id;
    const url = `${this.host}:${this.port}/account/password?=id=${userId}`;

    return await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password reset',
      template: 'reset-password',
      context: {
        url,
        url2: url,
      },
    });
  }

  async sendOrderInfo(orderInfo: OrderInfo) {
    const { action, movies_info, total, email, quantity, name } = orderInfo;

    return await this.mailerService.sendMail({
      to: email,
      subject: 'Order Info',
      template: 'send-order-info',
      context: {
        name,
        action,
        quantity,
        movies_info,
        total,
      },
    });
  }
}
