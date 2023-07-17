import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { IdDto } from '../dto/';

@Injectable()
export class CorrectIdGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const idDto = request.params as IdDto;
    const authenticatedUserId = request.user.id;
    const isCorrect = authenticatedUserId === idDto.id;
    return isCorrect;
  }
}
