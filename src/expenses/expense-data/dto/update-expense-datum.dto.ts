import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDatumDto } from './create-expense-datum.dto';

export class UpdateExpenseDatumDto extends PartialType(CreateExpenseDatumDto) {}
