import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './strategies/';
import { JwtStrategy } from './strategies/';
import { AuthService } from './services/';
import { AuthController } from './controllers/';

@Module({
  imports: [
    PassportModule,
    //TODO: Move to config directory
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '900s' },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
