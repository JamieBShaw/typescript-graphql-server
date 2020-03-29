import { MiddlewareFn } from 'type-graphql';
import { LoginContext } from 'server/types/LoginContext';

export const isAuth: MiddlewareFn<LoginContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error('User is not authenticated');
  }
  return next();
};
