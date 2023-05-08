import { IsString, IsNotEmpty, Validate } from 'class-validator';

/** Custom Validators */
import { IsNameUnique } from './is-name-uniqe.validator';

export class ExpenseReason {
  @IsNotEmpty()
  @IsString()
  @Validate(IsNameUnique)
  name: string;
}
