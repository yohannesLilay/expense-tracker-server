import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

/** Controllers */
import { AuthController } from './auth.controller';

/** Services */
import { AuthService } from './auth.service';

/** Guards & Strategies */
import { RolesGuard } from './common/guards/roles.guard';
import { AccessTokenStrategy } from './common/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './common/strategies/refreshToken.strategy';

/** Other Modules */
import { UsersModule } from './users/users.module';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RolesGuard,
  ],
})
export class AuthModule {}
