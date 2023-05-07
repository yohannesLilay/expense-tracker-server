import {
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { IsEmailUnique } from './is-email-uniqe.validator';

export class User {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsEmailUnique)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  @IsEmpty()
  status: boolean;

  @IsString()
  refresh_token?: string;
}
