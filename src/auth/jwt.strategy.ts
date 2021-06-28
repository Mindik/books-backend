import * as fs from 'fs';
import * as path from 'path';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { PayloadInterface } from './interfaces/payload.interface';
import { User } from '../user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: fs.readFileSync(path.join(__dirname, '../config/jwt/public.pem')),
      algorithms: ['RS256'],
    });
  }

  async validate({ uid }: PayloadInterface): Promise<User> {
    const user = await this.usersService.findOneByUid(uid);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
