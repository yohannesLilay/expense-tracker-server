import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateGeneralExpenseReportDto {
  @IsOptional()
  @IsUUID()
  expense_reason: string;

  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  end_date: Date;
}
