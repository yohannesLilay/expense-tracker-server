import { Module } from '@nestjs/common';
import { ExpenseDataModule } from './expense-data/expense-data.module';
import { ConfigurationsModule } from 'src/configurations/configurations.module';
import { ExpenseReportModule } from './expense-report/expense-report.module';

@Module({
  imports: [ExpenseDataModule, ConfigurationsModule, ExpenseReportModule],
})
export class ExpensesModule {}
