import { Resolver, Query, Mutation, Arg, Args } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { UserInputError } from 'apollo-server-express';
import { RegisterInput } from './register/RegisterInput';

@Resolver(User)
export class RegisterResolver {
  @Query(() => User)
  async userFinder(@Arg('email') email: string, @Arg('id') userId: number) {
    const user = await User.findOne({
      email: email,
      id: userId,
    });

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg('input')
    {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    }: RegisterInput
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
