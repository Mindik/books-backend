import * as fs from 'fs';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CryptoService } from './crypto.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    TokenModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          publicKey: fs.readFileSync(path.join(__dirname, '../config/jwt/public.pem')),
          privateKey: fs.readFileSync(path.join(__dirname, '../config/jwt/private.pem')),
          signOptions: { expiresIn: '2h', algorithm: 'RS256' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CryptoService],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
