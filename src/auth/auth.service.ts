import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/users.entity';

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
      email: user.email,
      admin: user.admin,
      client: user.client,
    };
    return { acces_token: this.jwtService.sign(payload) };
  }
}
