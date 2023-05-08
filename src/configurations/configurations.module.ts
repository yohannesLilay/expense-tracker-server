import { Module } from '@nestjs/common';
import { ExpenseReasonsModule } from './expense-reasons/expense-reasons.module';

@Module({
  imports: [ExpenseReasonsModule],
})
export class ConfigurationsModule {}
