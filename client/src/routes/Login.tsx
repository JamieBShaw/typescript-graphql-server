import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

interface formData {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const [errors, setErrors] = useState({});

    const { register, handleSubmit } = useForm<formData>();

    const [LoginUser] = useMutation(LOGIN_USER, {
        update(_, { data }) {
            console.log(data);
        },
        onError(err) {
            console.log(err.graphQLErrors[0]);
            setErrors(
                err.graphQLErrors[0].extensions!.exception.errors
            );
        },
    });

    const onSubmit = handleSubmit(({ username, password }) => {
        console.log('SUBMITTING');
        LoginUser({
            variables: {
                username: username,
                password: password,
            },
        });
    });

    return (
        <div className="App">
            <form onSubmit={onSubmit}>
                <input
                    name="username"
                    type="text"
                    ref={register}
                ></input>
                <input
                    name="password"
                    type="password"
                    ref={register}
                ></input>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(inputs: { username: $username, password: $password }) {
            username
            id
            email
            name
            lastName
            firstName
        }
    }
`;
