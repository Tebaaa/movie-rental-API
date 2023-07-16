import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@Users/entities/';
import { UsersService } from '@Users/services';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
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
}
