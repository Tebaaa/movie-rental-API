import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { ICurrentUser } from '@Core/interfaces';

import { AuthService } from '../services/';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<ICurrentUser> {
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    const { id, email, admin, client } = user;
    const userInfo = { id, email, admin, client };
    return userInfo;
  }
}
