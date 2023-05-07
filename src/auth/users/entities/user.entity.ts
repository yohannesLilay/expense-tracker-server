import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
import { IsEmailUnique } from './is-email-uniqe.validator';

export class User {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsEmailUnique()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsString()
  refresh_token?: string;
}
