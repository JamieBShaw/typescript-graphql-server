import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { User } from '../../../../../entity/User';

@ValidatorConstraint({ async: true })
export class IsUsernameOrEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  validate(usernameOrEmail: string) {
    return User.findOne({ where: { usernameOrEmail } }).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

export function IsUsernameOrEmailAlreadyExist(
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameOrEmailAlreadyExistConstraint,
    });
  };
}
