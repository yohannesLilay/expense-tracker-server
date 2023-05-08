import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

/** Guards */
import { AccessTokenGuard } from 'src/auth/common/guards/access-token.guard';
import { RolesGuard } from 'src/auth/common/guards/roles.guard';
import { Roles } from 'src/auth/common/roles.decorator';

/** Services */
import { SettingsService } from './settings.service';

/** DTOs */
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @Roles('ADMIN')
  async findAll() {
    return await this.settingsService.findAll();
  }

  @Get('current-user')
  @Roles('ADMIN', 'STANDARD')
  async findByUser(@Request() req: any) {
    return await this.settingsService.findByUser(req.user.user_id);
  }

  @Get(':id')
  @Roles('ADMIN')
  async findById(@Param('id') id: string) {
    return await this.settingsService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'STANDARD')
  async create(
    @Body() createSettingDto: CreateSettingDto,
    @Request() req: any,
  ) {
    return await this.settingsService.create(createSettingDto, req.user.id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'STANDARD')
  async update(
    @Param('id') id: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return await this.settingsService.update(id, updateSettingDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.settingsService.delete(id);
  }
}
