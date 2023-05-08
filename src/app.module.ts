import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

/** Custom Modules */
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST}:${parseInt(process.env.DB_PORT)}/${
        process.env.DB_NAME
      }`,
    ),
    AuthModule,
    SettingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
