import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

/** Guards */
import { AccessTokenGuard } from 'src/auth/common/guards/access-token.guard';
import { RolesGuard } from 'src/auth/common/guards/roles.guard';
import { Roles } from 'src/auth/common/roles.decorator';

/** Services */
import { ExpenseReasonsService } from './expense-reasons.service';

/** DTOs */
import { CreateExpenseReasonDto } from './dto/create-expense-reason.dto';
import { UpdateExpenseReasonDto } from './dto/update-expense-reason.dto';

@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('expense-reasons')
export class ExpenseReasonsController {
  constructor(private readonly expenseReasonsService: ExpenseReasonsService) {}

  @Get()
  @Roles('ADMIN')
  async findAll() {
    return await this.expenseReasonsService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  async findOne(@Param('id') id: string) {
    return await this.expenseReasonsService.findOne(id);
  }

  @Post()
  @Roles('ADMIN')
  async create(@Body() createExpenseReasonDto: CreateExpenseReasonDto) {
    return await this.expenseReasonsService.create(createExpenseReasonDto);
  }

  @Patch(':id')
  @Roles('ADMIN')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseReasonDto: UpdateExpenseReasonDto,
  ) {
    return await this.expenseReasonsService.update(id, updateExpenseReasonDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async delete(@Param('id') id: string) {
    return await this.expenseReasonsService.delete(id);
  }
}
