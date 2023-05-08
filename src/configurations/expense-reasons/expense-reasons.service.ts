import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/** DTOs */
import { CreateExpenseReasonDto } from './dto/create-expense-reason.dto';
import { UpdateExpenseReasonDto } from './dto/update-expense-reason.dto';

/** Schemas */
import { ExpenseReason, ExpenseReasonDocument } from './expense-reasons.schema';

@Injectable()
export class ExpenseReasonsService {
  constructor(
    @InjectModel(ExpenseReason.name)
    private readonly expenseReasonModel: Model<ExpenseReasonDocument>,
  ) {}
  async findAll(): Promise<ExpenseReason[]> {
    return await this.expenseReasonModel.find().exec();
  }

  async findOne(id: string): Promise<ExpenseReason> {
    return await this.expenseReasonModel.findById(id).exec();
  }

  async findByName(name: string): Promise<ExpenseReason> {
    return await this.expenseReasonModel.findOne({ name }).exec();
  }

  async create(
    createExpenseReasonDto: CreateExpenseReasonDto,
  ): Promise<ExpenseReason> {
    return await new this.expenseReasonModel(createExpenseReasonDto).save();
  }

  async update(
    id: string,
    updateExpenseReasonDto: UpdateExpenseReasonDto,
  ): Promise<ExpenseReason> {
    return await this.expenseReasonModel
      .findByIdAndUpdate(id, updateExpenseReasonDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<ExpenseReason> {
    return await this.expenseReasonModel.findByIdAndRemove(id).exec();
  }
}
