import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseReasonDto } from './create-expense-reason.dto';

export class UpdateExpenseReasonDto extends PartialType(CreateExpenseReasonDto) {}
