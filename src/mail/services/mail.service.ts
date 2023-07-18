// import { MailerService } from '@nestjs-modules/mailer';
// import { Injectable } from '@nestjs/common';

// import { OrderInfo } from '@Movies/classes';
// import { User } from '@Users/entities';

// @Injectable()
// export class MailService {
//   constructor(private mailerService: MailerService) {}
//   //TODO: use configService to get host & port
//   host = process.env.SERVER_HOST;
//   port = process.env.SERVER_PORT;

//   async sendPasswordReset(user: User) {
//     const userId = user.id;
//     const url = `${this.host}:${this.port}/account/password?=id=${userId}`;

//     return await this.mailerService.sendMail({
//       to: user.email,
//       subject: 'Password reset',
//       template: 'reset-password',
//       context: {
//         url,
//         url2: url,
//       },
//     });
//   }

//   async sendOrderInfo(orderInfo: OrderInfo) {
//     const { action, movies_info, total, email, quantity, name } = orderInfo;

//     return await this.mailerService.sendMail({
//       to: email,
//       subject: 'Order Info',
//       template: 'send-order-info',
//       context: {
//         name,
//         action,
//         quantity,
//         movies_info,
//         total,
//       },
//     });
//   }
// }
