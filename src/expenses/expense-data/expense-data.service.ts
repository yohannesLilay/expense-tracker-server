import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/** DTOs */
import { CreateExpenseDatumDto } from './dto/create-expense-datum.dto';
import { UpdateExpenseDatumDto } from './dto/update-expense-datum.dto';

/** Schemas */
import { ExpenseData, ExpenseDataDocument } from './expense-data.schema';

/** Services */
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class ExpenseDataService {
  constructor(
    @InjectModel(ExpenseData.name)
    private readonly expenseDataModel: Model<ExpenseDataDocument>,
    private readonly settindsService: SettingsService,
  ) {}

  async findAll(): Promise<ExpenseData[]> {
    return await this.expenseDataModel
      .find()
      .populate('expense_reason', ['name'])
      .populate('user', ['name', 'email'])
      .exec();
  }

  async findByUser(userId: string): Promise<ExpenseData[]> {
    return await this.expenseDataModel
      .find({ user: userId })
      .populate('expense_reason', ['name'])
      .populate('user', ['name', 'email'])
      .exec();
  }

  async findOne(id: string): Promise<ExpenseData> {
    return await this.expenseDataModel
      .findById(id)
      .populate('expense_reason', ['name'])
      .populate('user', ['name', 'email'])
      .exec();
  }

  async create(
    createExpenseDatumDto: CreateExpenseDatumDto,
    userId: string,
  ): Promise<ExpenseData> {
    const userSetting = await this.settindsService.findByUser(userId);
    if (!userSetting)
      throw new BadRequestException(
        'Invalid input: please configure the setting first',
      );

    const previousExpense: any = await this.expenseDataModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();

    let remaining_amount = 0;
    if (previousExpense.length == 0) {
      remaining_amount = userSetting.total_monthly_income;
    }
    if (
      createExpenseDatumDto.date == userSetting.income_start_date &&
      previousExpense[0].date != userSetting.income_start_date
    ) {
      remaining_amount =
        userSetting.total_monthly_income - createExpenseDatumDto.amount;
    } else {
      remaining_amount =
        previousExpense[0].remaining_amount - createExpenseDatumDto.amount;
    }

    return await new this.expenseDataModel({
      ...createExpenseDatumDto,
      remaining_amount,
      user: userId,
    }).save();
  }

  async update(
    id: string,
    updateExpenseDatumDto: UpdateExpenseDatumDto,
  ): Promise<ExpenseData> {
    return await this.expenseDataModel
      .findByIdAndUpdate(id, updateExpenseDatumDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<ExpenseData> {
    return await this.expenseDataModel.findByIdAndRemove(id).exec();
  }
}
