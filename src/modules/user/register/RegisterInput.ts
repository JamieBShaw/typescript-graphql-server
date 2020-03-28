import { InputType, Field } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';

import { IsUsernameOrEmailAlreadyExist } from './utils/validation/isUsernameOrEmailAlreadyExist';

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 30, { message: 'Please provide your first name' })
  firstName: string;

  @Field()
  @Length(1, 30, { message: 'Please provide your last name' })
  lastName: string;

  @Field()
  @Length(1, 30, { message: 'Please provider a username' })
  @IsUsernameOrEmailAlreadyExist({ message: 'Username already in use' })
  username: string;

  @Field()
  @IsEmail()
  @IsUsernameOrEmailAlreadyExist({ message: 'Email already in use' })
  email: string;

  @Field()
  @Length(8, 30, { message: 'Password must 8 characters or more' })
  password: string;

  @Field()
  @Length(8, 30, { message: 'Password must be 8 characters or more' })
  confirmPassword: string;
}
