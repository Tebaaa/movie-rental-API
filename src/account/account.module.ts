import { Module } from '@nestjs/common';

import { UsersModule } from '@Users/users.module';

import { AccountController } from './controllers/';
import { AccountService } from './services/';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [UsersModule],
})
export class AccountModule {}
