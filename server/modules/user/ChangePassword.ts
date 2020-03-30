import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import { redis } from '../../redis';
import bcrypt from 'bcryptjs';

import { resetPasswordPrefix } from '../../utils/constants/redisPrefixes';
import { ChangePasswordInput } from './changePassword/ChangePasswordInputs';
import { LoginContext } from '../../types/LoginContext';

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg('input')
        {
            token,
            newPassword,
            confirmNewPassword,
        }: ChangePasswordInput,
        @Ctx() ctx: LoginContext
    ): Promise<User | undefined> {
        const userId = await redis.get(resetPasswordPrefix + token);

        if (!userId) {
            return undefined;
        }

        if (!(newPassword === confirmNewPassword)) {
            throw new Error('Passwords do not match');
        }

        await redis.del(resetPasswordPrefix + token);

        const hasedPassword = await bcrypt.hash(newPassword, 12);

        await User.update(
            { id: parseInt(userId, 10) },
            { password: hasedPassword }
        );

        const user = await User.findOne(userId);

        if (!user) {
            return undefined;
        }

        ctx.req.session!.userId = user.id;

        return user;
    }
}
