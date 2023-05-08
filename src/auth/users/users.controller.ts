import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';

/** Guards */
import { AccessTokenGuard } from 'src/auth/common/guards/access-token.guard';
import { RolesGuard } from 'src/auth/common/guards/roles.guard';
import { Roles } from '../common/roles.decorator';

/** DTOs */
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/** Services */
import { UsersService } from './users.service';

@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('ADMIN')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  async findById(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Post()
  @Roles('ADMIN')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @Roles('ADMIN')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
