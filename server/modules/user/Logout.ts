import { Resolver, Mutation, Ctx } from 'type-graphql';
import { LoginContext } from '../../types/LoginContext';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: LoginContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          rej(false);
        }

        ctx.res.clearCookie('qid');

        res(true);
      })
    );
  }
}
