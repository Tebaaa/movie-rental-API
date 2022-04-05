import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IOrderInfo } from '../movie-rental/interfaces/order-info.interface';
import { MovieEntity } from '../movies/entities/movie.entity';
import { User } from '../users/entities/users.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  host = process.env.SERVER_HOST;
  port = process.env.SERVER_PORT;

  async sendPasswordReset(user: User) {
    const userId = user.id;
    const url = `${this.host}:${this.port}/account/password?=id=${userId}`;

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

  async sendOrderInfo(orderInfo: IOrderInfo) {
    const { action, movies, movies_info, total, user } = orderInfo;
    const quantity = movies.length;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Order Info',
      template: 'send-order-info',
      context: {
        name: user.name,
        action,
        quantity,
        movies_info: movies_info,
        total,
      },
    });
  }
}
