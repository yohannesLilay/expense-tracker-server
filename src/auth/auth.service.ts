import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

/** 3rd Party Imports */
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

/** Custom DTOs */
import { AuthDto } from './dto/auth.dto';

/** Custom Services */
import { UsersService } from './users/users.service';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private settingsService: SettingsService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: AuthDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user)
      throw new BadRequestException(
        'Unable to authenticate with provided credentials.',
      );

    const passwordMatches = await this.compareData(
      data.password,
      user.password,
    );
    if (!passwordMatches)
      throw new BadRequestException(
        'Unable to authenticate with provided credentials.',
      );

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    // Check if the user has settings configured
    const setting = await this.settingsService.findByUser(user.id);

    return {
      access_token: 'Bearer ' + tokens.accessToken,
      refresh_token: tokens.refreshToken,
      userId: user.id,
      email: user.email,
      name: user.name,
      roles: user.role,
      setting_configured: setting ? 'yes' : 'no',
    };
  }

  async logout(userId: string) {
    return this.usersService.update(userId, { refresh_token: null });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refresh_token: hashedRefreshToken,
    });
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          user_id: userId,
          email,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        },
      ),

      this.jwtService.signAsync(
        {
          user_id: userId,
          email,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await this.compareData(
      refreshToken,
      user.refresh_token,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      accessToken: 'Bearer ' + tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));

    return await bcrypt.hash(data, salt);
  }

  async compareData(value1, value2): Promise<boolean> {
    return await bcrypt.compare(value1, value2);
  }
}
