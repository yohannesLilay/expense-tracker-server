import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';

/** Schemas */
import { ExpenseReason } from 'src/configurations/expense-reasons/expense-reasons.schema';
import { User } from 'src/auth/users/users.schema';

export type ExpenseDataDocument = HydratedDocument<ExpenseData>;

@Schema({ timestamps: true })
export class ExpenseData {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ required: true })
  remaining_amount: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ExpenseReason',
    required: true,
  })
  expense_reason: ExpenseReason;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  id: string;
}

export const ExpenseDataSchema = SchemaFactory.createForClass(ExpenseData);

ExpenseDataSchema.virtual('id').get(function () {
  return this._id.toString();
});

ExpenseDataSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  },
  versionKey: false,
  getters: true,
  virtuals: true,
});
