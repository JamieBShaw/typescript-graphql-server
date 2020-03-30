import { Resolver, Mutation, Arg } from 'type-graphql';

import { User } from '../../entity/User';

import { redis } from '../../redis';
import { accountConfirmationPrefix } from '../../utils/constants/redisPrefixes';

@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
    async confirmUser(@Arg('token') token: string): Promise<boolean> {
        const userId = await redis.get(
            accountConfirmationPrefix + token
        );

        if (!userId) {
            return false;
        }

        await User.update(
            { id: parseInt(userId, 10) },
            { active: true }
        );
        await redis.del(token);

        return true;
    }
}
