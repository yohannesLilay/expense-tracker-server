import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/** Services */
import { SettingsService } from './settings.service';

/** Controllers */
import { SettingsController } from './settings.controller';

/** Schemas */
import { Setting, SettingSchema } from './settings.schema';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService],
  imports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
  ],
  exports: [SettingsService],
})
@Global()
export class SettingsModule {}
