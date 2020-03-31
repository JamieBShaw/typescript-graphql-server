import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
};

const Register: React.FC = () => {
    const [values, setValues] = useState(initialState);

    const [registerUser] = useMutation(REGISTER_USER, {
        update(_, { data }) {
            console.log(data);
        },
        onError(err) {
            console.log(err.message);
            console.log(err.graphQLErrors);
        },
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        registerUser({
            variables: {
                ...values,
            },
        });
    };

    return (
        <div className="App">
            <form onSubmit={onSubmit}>
                <label>
                    First Name
                    <input
                        name="firstName"
                        value={values?.firstName}
                        type="text"
                        onChange={onChange}
                    ></input>
                </label>
                <label>
                    Last Name
                    <input
                        name="lastName"
                        value={values?.lastName}
                        type="text"
                        onChange={onChange}
                    ></input>
                </label>

                <label>
                    Username
                    <input
                        name="username"
                        value={values?.username}
                        type="text"
                        onChange={onChange}
                    ></input>
                </label>
                <label>
                    Email
                    <input
                        name="email"
                        value={values?.email}
                        type="email"
                        onChange={onChange}
                    ></input>
                </label>
                <label>
                    Password
                    <input
                        name="password"
                        value={values?.password}
                        type="password"
                        onChange={onChange}
                    ></input>
                </label>
                <label>
                    Confirm Your Password
                    <input
                        name="confirmPassword"
                        value={values?.confirmPassword}
                        type="password"
                        onChange={onChange}
                    ></input>
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

const REGISTER_USER = gql`
    mutation register(
        $firstName: String!
        $lastName: String!
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            inputs: {
                firstName: $firstName
                lastName: $lastName
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            username
            id
            email
            name
            lastName
            firstName
        }
    }
`;
export default Register;
