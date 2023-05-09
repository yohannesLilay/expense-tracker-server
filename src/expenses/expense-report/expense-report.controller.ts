import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

/** Guards */
import { AccessTokenGuard } from 'src/auth/common/guards/access-token.guard';
import { RolesGuard } from 'src/auth/common/guards/roles.guard';
import { Roles } from 'src/auth/common/roles.decorator';

/** DTOs */
import { CreateGeneralExpenseReportDto } from './dto/create-general-expense-report.dto';

/** Services */
import { ExpenseDataService } from '../expense-data/expense-data.service';

@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('expense-report')
export class ExpenseReportController {
  constructor(private readonly expenseDataService: ExpenseDataService) {}

  @Get('')
  @Roles('ADMIN', 'STANDARD')
  async expenseSumGroupByMonth(
    @Param('reasonId') reasonId: string,
    @Req() req: any,
  ) {
    return await this.expenseDataService.expenseSumByMonth(
      req.user.id,
      reasonId,
    );
  }

  @Post('general')
  @Roles('ADMIN', 'STANDARD')
  async generalExpenseReport(
    @Body() createGeneralExpenseReportDto: CreateGeneralExpenseReportDto,
    @Req() req: any,
  ) {
    return await this.expenseDataService.generalExpenseReport(
      req.user.id,
      createGeneralExpenseReportDto.expense_reason,
      createGeneralExpenseReportDto.start_date,
      createGeneralExpenseReportDto.end_date,
    );
  }
}
