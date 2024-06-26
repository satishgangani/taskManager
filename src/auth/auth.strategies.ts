import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'e9c280422cb57291af4bf7ff1bbd223572fdd39c9e659e0d6cc1833087eaa1e9',
    });
  }

  async validate(payload: any) {
    const jwtToken = payload.token;
    const user = await this.authService.validateUserById(payload.sub, jwtToken);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
