import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/** Services */
import { ExpenseReasonsService } from './expense-reasons.service';

/** Controllers */
import { ExpenseReasonsController } from './expense-reasons.controller';

/** Schemas */
import { ExpenseReason, ExpenseReasonSchema } from './expense-reasons.schema';

@Module({
  controllers: [ExpenseReasonsController],
  providers: [ExpenseReasonsService],
  imports: [
    MongooseModule.forFeature([
      { name: ExpenseReason.name, schema: ExpenseReasonSchema },
    ]),
  ],
  exports: [ExpenseReasonsService],
})
export class ExpenseReasonsModule {}
