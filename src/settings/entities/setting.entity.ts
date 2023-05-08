import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
} from 'class-validator';

export class Setting {
  @IsNotEmpty()
  @IsNumber()
  total_monthly_income: number;

  @IsNotEmpty()
  @IsDate()
  income_start_date: Date;

  @IsOptional()
  @IsString()
  date_format: string;
}
