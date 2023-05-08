import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

/** Services */
import { ExpenseReasonsService } from '../expense-reasons.service';

@ValidatorConstraint({ name: 'isNameUnique', async: true })
@Injectable()
export class IsNameUnique implements ValidatorConstraintInterface {
  constructor(private readonly expenseReasonsService: ExpenseReasonsService) {}

  async validate(name: string) {
    const expenseReason = await this.expenseReasonsService.findByName(name);
    return !expenseReason;
  }

  defaultMessage() {
    return 'Name already exists';
  }
}
