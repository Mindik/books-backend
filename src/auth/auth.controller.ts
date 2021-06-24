import { Controller, Post, Body, Res, UseInterceptors, ClassSerializerInterceptor, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/Public.decorator';
import { SUCCESS_LOGOUT } from '../common/responses/response.constants';
import { RESPONSE, SUCCESS_RESPONSE } from '../common/responses/responses.functions';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDto): Promise<{ access: string }> {
    const { access, refresh } = await this.authService.login(loginDto);
    res.cookie('refresh', refresh, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      signed: true,
    });
    return { access };
  }

  @Post('register')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return new User(await this.authService.register(registerDto));
  }

  @Post('refresh')
  @Public()
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<{ access: string }> {
    const { refresh: refreshToken } = req.signedCookies;
    const { access, refresh } = await this.authService.refreshToken(refreshToken);
    res.cookie('refresh', refresh, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      signed: true,
    });
    return { access };
  }

  @ApiBearerAuth()
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<RESPONSE<string>> {
    const user = <User>req.user;
    const { refresh } = req.signedCookies;
    if (refresh) {
      await this.authService.logout(refresh, user);
    }
    res.clearCookie('refresh', '');
    return SUCCESS_RESPONSE<string>(SUCCESS_LOGOUT);
  }
}
