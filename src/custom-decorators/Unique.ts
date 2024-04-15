import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Op } from 'sequelize';
import { USERS_REPOSITORY } from 'src/constants';
import { User } from 'src/modules/users/user.model'; // Verifique se o caminho está correto aqui

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(@Inject(USERS_REPOSITORY) private userModel: typeof User) {}

  async validate(value: any): Promise<boolean> {
    const user = await this.userModel.findOne({
      where: {
        [Op.or]: [{ username: value }, { email: value }],
      },
    });
    return !user;
  }

  defaultMessage(): string {
    return 'Value already in use.';
  }
}

export function Unique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueConstraint,
    });
  };
}
