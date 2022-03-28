import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleChecker } from './roleChecker';

@Injectable()
export class ClientGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roleChecker = new RoleChecker(context);
    if (roleChecker.isClient()) return true;
    return false;
  }
}
