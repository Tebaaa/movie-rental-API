import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { IdParamDto } from '@Core/dtos';

@Injectable()
export class CorrectIdGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const idDto = request.params as IdParamDto;
    const authenticatedUserId = request.user.id;
    const isCorrect = authenticatedUserId === idDto.id;
    return isCorrect;
  }
}
