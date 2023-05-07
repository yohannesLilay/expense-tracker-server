import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

/** Custom DTOs */
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from './users/dto/create-user.dto';

/** Custom Guards */
import { AccessTokenGuard } from './common/guards/access-token.guard';
import { RefreshTokenGuard } from './common/guards/refresh-token.guard';

/** Custom Services */
import { AuthService } from './auth.service';
import { UsersService } from './users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersSevice: UsersService,
  ) {}

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @Post('signup')
  signup(@Body() data: CreateUserDto) {
    return this.usersSevice.create(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];

    return this.authService.refreshTokens(userId, refreshToken);
  }
}
