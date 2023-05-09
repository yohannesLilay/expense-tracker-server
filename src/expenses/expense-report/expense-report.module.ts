import { Module } from '@nestjs/common';

/** Services */
import { ExpenseReportService } from './expense-report.service';

/** Controllers */
import { ExpenseReportController } from './expense-report.controller';

/** Other Modules */
import { ExpenseDataModule } from '../expense-data/expense-data.module';

@Module({
  controllers: [ExpenseReportController],
  providers: [ExpenseReportService],
  imports: [ExpenseDataModule],
})
export class ExpenseReportModule {}
