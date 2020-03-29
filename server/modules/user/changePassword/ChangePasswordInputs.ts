import { InputType, Field } from 'type-graphql';
import { Min } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field()
  token: string;

  @Field()
  @Min(8, { message: 'Password must be atleast 8 characters' })
  newPassword: string;

  @Field()
  @Min(8, { message: 'Password must be atleast 8 characters' })
  confirmNewPassword: string;
}
