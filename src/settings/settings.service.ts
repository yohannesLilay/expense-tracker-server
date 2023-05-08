import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/** DTOs */
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

/** Schemas */
import { Setting, SettingDocument } from '../settings/settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name)
    private readonly settingModel: Model<SettingDocument>,
  ) {}

  async findAll(): Promise<Setting[]> {
    return await this.settingModel.find().exec();
  }

  async findOne(id: string): Promise<Setting> {
    return await this.settingModel.findById(id).exec();
  }

  async findByUser(user: string): Promise<Setting> {
    return await this.settingModel.findOne({ user }).exec();
  }

  async create(
    createSettingDto: CreateSettingDto,
    userId: string,
  ): Promise<Setting> {
    const user = await this.findByUser(userId);
    if (user)
      throw new BadRequestException(
        'Invalid input: user already have settings configured',
      );

    return await new this.settingModel({
      ...createSettingDto,
      user: userId,
    }).save();
  }

  async update(
    id: string,
    updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    return await this.settingModel
      .findByIdAndUpdate(id, updateSettingDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Setting> {
    return await this.settingModel.findByIdAndRemove(id).exec();
  }
}
