import { InputType, Field } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';

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
    username: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @Length(8, 30, { message: 'Password must 8 characters or more' })
    password: string;

    @Field()
    @Length(8, 30, { message: 'Password must 8 characters or more' })
    confirmPassword: string;
}
