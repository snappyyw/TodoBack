import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

import { User } from "../users/users.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    } as any);
  }

  async validate(payload: User) {
    const user = await this.usersService.findUserById(payload.id);

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
