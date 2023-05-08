import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';

/** Schemas */
import { User } from 'src/auth/users/users.schema';

export type SettingDocument = HydratedDocument<Setting>;

@Schema({ timestamps: true })
export class Setting {
  @Prop({ required: true })
  total_monthly_income: number;

  @Prop({ required: true })
  income_start_date: Date;

  @Prop({ required: true, default: 'YYYY-MM-DD' })
  date_format: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);

SettingSchema.virtual('id').get(function () {
  return this._id.toString();
});

SettingSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  },
  versionKey: false,
  getters: true,
  virtuals: true,
});
