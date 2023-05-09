import { IsNotEmpty, IsNumber, IsDate, IsUUID } from 'class-validator';
import { IsValidExpenseReason } from './is-valid-expense-reason.validator';

export class ExpenseDatum {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsUUID()
  @IsValidExpenseReason()
  expense_reason: string;
}
