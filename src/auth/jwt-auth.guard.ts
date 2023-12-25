import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'token khong hop le hoac khong co token o header',
        )
      );
    }
    //check permissions
    const tagetMethod = request.method;
    const tagetEndpoint = request.route?.path as string;

    const permission = user?.permissions ?? [];
    let isExist = permission.find(
      (permission) =>
        tagetMethod === permission.method &&
        tagetEndpoint === permission.apiPath,
    );
    if (tagetEndpoint.startsWith('/api/v1/auth')) isExist = true;
    if (!isExist)
      throw new ForbiddenException('Ban khong co quyen truy cap endpoint nay');
    return user;
  }
}
