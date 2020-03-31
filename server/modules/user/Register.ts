import { Resolver, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { UserInputError, ValidationError } from 'apollo-server-express';
import { RegisterInput } from './register/RegisterInput';
import { sendEmail } from '../../utils/Email/sendEmail';
import { createConfirmationUrl } from '../../utils/Email/createConfirmationUrl';

@Resolver(User)
export class RegisterResolver {
    @Mutation(() => User)
    async register(
        @Arg('inputs')
        {
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
        }: RegisterInput
    ): Promise<User> {
        const userWithEmailOrUsernameAlreadyExist = await User.createQueryBuilder(
            'user'
        )
            .where('user.email = :email OR user.username = :username', {
                email: email,
                username: username,
            })
            .getOne();

        if (userWithEmailOrUsernameAlreadyExist) {
            throw new ValidationError('User already exists');
        }

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

        await sendEmail(email, await createConfirmationUrl(user.id));

        return user;
    }
}
