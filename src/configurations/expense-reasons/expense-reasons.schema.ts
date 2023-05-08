import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpenseReasonDocument = HydratedDocument<ExpenseReason>;

@Schema({ timestamps: true })
export class ExpenseReason {
  @Prop({ required: true, unique: true })
  name: string;

  id: string;
}

export const ExpenseReasonSchema = SchemaFactory.createForClass(ExpenseReason);

ExpenseReasonSchema.virtual('id').get(function () {
  return this._id.toString();
});

ExpenseReasonSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  },
  versionKey: false,
  getters: true,
  virtuals: true,
});
