import { Resolver, Ctx, Query, UseMiddleware } from 'type-graphql';
import { User } from '../../entity/User';

import { LoginContext } from '../../types/LoginContext';
import { isAuth } from '../../utils/middleware/isAuth';

@Resolver(User)
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: LoginContext): Promise<User | undefined> {
    const id = ctx.req.session!.userId;

    if (!id) {
      return undefined;
    }

    return await User.findOne(id);
  }

  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return 'hello';
  }
}
