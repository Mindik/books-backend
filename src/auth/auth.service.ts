import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from '../token/entities/token.entity';
import { TokenService } from '../token/token.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { INVALID_CREDENTIAL, UNAUTHORIZED_EXCEPTION } from './auth.constants';
import { CryptoService } from './crypto.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PayloadInterface } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly tokenService: TokenService,
  ) {}

  private getTokenPayload({ uid, email, roles: userRoles }: User): PayloadInterface {
    const roles = userRoles.map((role) => role.value);
    return { uid, email, roles };
  }

  private async generateTokens(user: User): Promise<{ access: string; refresh: string }> {
    const payload = this.getTokenPayload(user);
    const access = this.jwtService.sign(payload);
    const refresh = this.jwtService.sign(payload, { expiresIn: '1d' });
    await this.tokenService.create({ token: refresh }, user);
    return { access, refresh };
  }

  async refreshToken(refreshToken): Promise<{ access: string; refresh: string }> {
    if (!refreshToken) throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION);
    const tokenUser = this.jwtService.verify(refreshToken);
    if (!tokenUser) throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION);

    const user = await this.userService.findOneByUid(tokenUser.uid);
    await this.userService.isValidUser(user, 'banned');
    await this.tokenService.removeByUser(refreshToken, user);
    return await this.generateTokens(user);
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const hash = await this.cryptoService.getHash(registerDto.password);
    return this.userService.create({ ...registerDto, password: hash });
  }

  async login({ email, password }: LoginDto): Promise<{ access: string; refresh: string }> {
    const user = await this.userService.findOneByEmail(email);
    await this.userService.isValidUser(user, 'banned');
    await this.cryptoService.checkPassword(password, user.password);
    return await this.generateTokens(user);
  }

  async logout(refreshToken: string, user: User): Promise<Token> {
    return this.tokenService.removeByUser(refreshToken, user);
  }
}
