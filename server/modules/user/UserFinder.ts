import { Resolver, Query, Arg } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver(User)
export class UserFinderResolver {
    @Query(() => User)
    async userFinder(
        @Arg('email') email?: string,
        @Arg('id') userId?: number
    ): Promise<User> {
        const user = await User.findOne({
            email: email,
            id: userId,
        });

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
