import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

/** Services */
import { ExpenseReasonsService } from 'src/configurations/expense-reasons/expense-reasons.service';

@Injectable()
@ValidatorConstraint({ name: 'isValidExpenseReason', async: true })
export class IsValidExpenseReasonValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly expenseReasonsService: ExpenseReasonsService) {}

  async validate(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) return false;

    const expenseReason = await this.expenseReasonsService.findOne(id);
    if (!expenseReason) return false;
    return true;
  }

  defaultMessage(): string {
    return 'Invalid MongoDB id or expense reason do not exist';
  }
}

export function IsValidExpenseReason(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isValidExpenseReason',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidExpenseReasonValidator,
    });
  };
}
