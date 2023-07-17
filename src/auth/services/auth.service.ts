import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';

import { User } from '@Users/entities/';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) {}

  async validateUser(email: string, password: string) {
    const [user] = await this.eventEmitter.emitAsync(
      'users.getOneByEmail',
      email,
    );
    if (user instanceof User && user.password === password) {
      return user;
    }
    return null;
  }
  async login(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      admin: user.admin,
      client: user.client,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  //TODO: Save tokens in DB
}
