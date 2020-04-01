import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { TextField, Button } from '@material-ui/core/';
import useStyles from './Styles';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
};

const Register: React.FC = () => {
    const classes = useStyles();

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
        <form className={classes.formContainer} onSubmit={onSubmit}>
            <TextField
                className={classes.title}
                name="firstName"
                value={values?.firstName}
                type="text"
                onChange={onChange}
            ></TextField>
            <TextField
                name="lastName"
                value={values?.lastName}
                type="text"
                onChange={onChange}
            ></TextField>
            <TextField>
                name="username" value={values?.username}
                type="text" onChange={onChange}
            </TextField>
            <TextField
                name="email"
                value={values?.email}
                type="email"
                onChange={onChange}
            ></TextField>
            <TextField
                name="password"
                value={values?.password}
                type="password"
                onChange={onChange}
            ></TextField>
            <TextField
                name="confirmPassword"
                value={values?.confirmPassword}
                type="password"
                onChange={onChange}
            ></TextField>
            <Button type="submit">Login</Button>
        </form>
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
