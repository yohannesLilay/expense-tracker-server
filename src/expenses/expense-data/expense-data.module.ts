import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/** Services */
import { ExpenseDataService } from './expense-data.service';

/** Controllers */
import { ExpenseDataController } from './expense-data.controller';

/** Custom Validators */
import { IsValidExpenseReasonValidator } from './entities/is-valid-expense-reason.validator';

/** Schemas */
import { ExpenseData, ExpenseDataSchema } from './expense-data.schema';

/** Other Modules */
import { ExpenseReasonsModule } from 'src/configurations/expense-reasons/expense-reasons.module';

@Module({
  controllers: [ExpenseDataController],
  providers: [ExpenseDataService, IsValidExpenseReasonValidator],
  imports: [
    MongooseModule.forFeature([
      { name: ExpenseData.name, schema: ExpenseDataSchema },
    ]),
    ExpenseReasonsModule,
  ],
  exports: [ExpenseDataService],
})
export class ExpenseDataModule {}
