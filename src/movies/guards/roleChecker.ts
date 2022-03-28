import { ExecutionContext } from '@nestjs/common';

export class RoleChecker {
  request;
  role;
  constructor(context: ExecutionContext) {
    this.request = context.switchToHttp().getRequest();
    this.role = this.request.user.role;
  }
  isAdmin() {
    if (this.role === 'admin') return true;
    return false;
  }
  isClient() {
    if (this.role === 'client') return true;
    return false;
  }
}
