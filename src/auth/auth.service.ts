import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  async login(user) {
    const payload = { username: user.username, role: user.role };
    return { acces_token: this.jwtService.sign(payload) };
  }
}
