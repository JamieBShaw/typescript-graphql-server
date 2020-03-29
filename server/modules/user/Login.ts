import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import bcrypt from 'bcryptjs';
import { LoginInput } from './login/LoginInputs';
import { LoginContext } from '../../types/LoginContext';

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('inputs')
    { username, email, password }: LoginInput,
    @Ctx() ctx: LoginContext
  ): Promise<User | null> {
    const user = await User.createQueryBuilder('user')
      .where('user.email = :email OR user.username = :username', {
        email: email,
        username: username,
      })
      .getOne();

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    if (!user.active) {
      throw new Error('User has not yet confirmed account');
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}
