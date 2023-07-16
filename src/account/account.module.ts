import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [UsersModule],
})
export class AccountModule {}
