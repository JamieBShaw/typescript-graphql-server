import { InputType, Field } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 30)
  firstName: string;

  @Field()
  @Length(1, 30)
  lastName: string;

  @Field()
  @Length(1, 30)
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}
