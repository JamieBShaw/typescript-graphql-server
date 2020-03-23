import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { UserInputError } from 'apollo-server-express';

@Resolver(User)
export class RegisterResolver {
  @Query(() => String, {})
  async hello() {
    return 'Hello World';
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('confirmPassword') confirmPassword: string
  ): Promise<User> {
    if (confirmPassword !== password) {
      throw new UserInputError('passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    }).save();

    return user;
  }
}
