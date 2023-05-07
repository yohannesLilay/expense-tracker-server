import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

/** Controllers */
import { AuthController } from './auth.controller';
import { UsersController } from './users/users.controller';

/** Services */
import { AuthService } from './auth.service';
import { UsersService } from './users/users.service';

/** Guards & Strategies */
import { RolesGuard } from './common/guards/roles.guard';
import { AccessTokenStrategy } from './common/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './common/strategies/refreshToken.strategy';

/** Schemas */
import { User, UserSchema } from './users/users.schema';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController, UsersController],
  providers: [
    AuthService,
    UsersService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RolesGuard,
  ],
})
export class AuthModule {}
