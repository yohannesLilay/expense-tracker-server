import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';

/** Constants */
import { RolesEnum } from 'src/constants/rolesEnum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: true })
  status: boolean;

  @Prop({
    type: String,
    enum: RolesEnum,
    required: true,
  })
  role: RolesEnum;

  @Prop()
  refresh_token: string;

  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id.toString();
});

UserSchema.pre('save', async function (next: any) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(
      this.password,
      parseInt(process.env.SALT_ROUND),
    );
    this.password = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  },
  versionKey: false,
  getters: true,
  virtuals: true,
});
