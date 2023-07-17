import { Module } from '@nestjs/common';

import { AccountController } from './controllers/';
import { AccountService } from './services/';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
