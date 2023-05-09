import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

/** Guards */
import { AccessTokenGuard } from 'src/auth/common/guards/access-token.guard';
import { RolesGuard } from 'src/auth/common/guards/roles.guard';
import { Roles } from 'src/auth/common/roles.decorator';

/** Services */
import { ExpenseDataService } from './expense-data.service';

/** DTOs */
import { CreateExpenseDatumDto } from './dto/create-expense-datum.dto';
import { UpdateExpenseDatumDto } from './dto/update-expense-datum.dto';

@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('expense-data')
export class ExpenseDataController {
  constructor(private readonly expenseDataService: ExpenseDataService) {}

  @Get()
  @Roles('ADMIN')
  async findAll() {
    return await this.expenseDataService.findAll();
  }

  @Get('/current-user')
  @Roles('ADMIN', 'STANDARD')
  async findByUser(@Req() req: any) {
    return await this.expenseDataService.findByUser(req.user.id);
  }

  @Get(':id')
  @Roles('ADMIN', 'STANDARD')
  async findOne(@Param('id') id: string) {
    return await this.expenseDataService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'STANDARD')
  async create(
    @Body() createExpenseDatumDto: CreateExpenseDatumDto,
    @Req() req: any,
  ) {
    return await this.expenseDataService.create(
      createExpenseDatumDto,
      req.user.id,
    );
  }

  @Patch(':id')
  @Roles('ADMIN', 'STANDARD')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDatumDto: UpdateExpenseDatumDto,
  ) {
    return await this.expenseDataService.update(id, updateExpenseDatumDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'STANDARD')
  async delete(@Param('id') id: string) {
    return await this.expenseDataService.delete(id);
  }
}
