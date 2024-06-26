import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roles } from 'src/user/user.entity';
import * as jwt from 'jsonwebtoken'
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(' ')[1];
       
        try {
            const secretKey = 'e9c280422cb57291af4bf7ff1bbd223572fdd39c9e659e0d6cc1833087eaa1e9';
            const payload = jwt.verify(token, secretKey) as jwt.JwtPayload;
            // Attach user to request object
            request.user = payload;
            // If no roles are specified, allow access
            return requiredRoles.includes(payload.role);
            
          } catch (error) {
            throw new UnauthorizedException('Invalid JWT token');
          }
    }
}
