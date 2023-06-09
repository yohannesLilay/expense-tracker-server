import { Injectable } from '@nestjs/common';

/** 3rd Party Imports */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/** Schemas */
import { User, UserDocument } from './users.schema';

/** DTOs */
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/** Constants */
import { RolesEnum } from 'src/constants/rolesEnum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await new this.userModel({
      ...createUserDto,
      role: RolesEnum.STANDARD,
    }).save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id).exec();
  }
}
