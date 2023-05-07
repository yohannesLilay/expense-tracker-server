import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

/** Custom Services */
import { UsersService } from '../users.service';

@Injectable()
@ValidatorConstraint({ name: 'isEmailUnique', async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    return !user;
  }

  defaultMessage() {
    return 'Email already exists';
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isEmailUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsEmailUniqueValidator,
    });
  };
}
