import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { TextField, Button, Grid, Paper } from '@material-ui/core/';
import useStyles from './Styles';

interface StateProps {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
}
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

    //   const [errors, setErrors] = useState<StateProps | null>();

    const [values, setValues] = useState<StateProps>(initialState);

    const [registerUser] = useMutation(REGISTER_USER, {
        update(_, { data }) {
            console.log(data);
        },
        onError(err) {
            console.log(err.message);

            console.log(
                err.graphQLErrors[0].extensions!.exception.validationErrors
            );
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
        <Grid justify="center" container>
            <Paper className={classes.control}>
                <form onSubmit={onSubmit}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={values?.firstName}
                        type="text"
                        onChange={onChange}
                    ></TextField>
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={values?.lastName}
                        type="text"
                        onChange={onChange}
                    ></TextField>
                    <TextField
                        label="Username"
                        name="username"
                        value={values?.username}
                        type="text"
                        onChange={onChange}
                    ></TextField>
                    <TextField
                        label="Email address"
                        name="email"
                        value={values?.email}
                        type="email"
                        onChange={onChange}
                    ></TextField>
                    <TextField
                        label="Password"
                        name="password"
                        value={values?.password}
                        type="password"
                        onChange={onChange}
                    ></TextField>
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        value={values?.confirmPassword}
                        type="password"
                        onChange={onChange}
                    ></TextField>
                    <Button
                        size="small"
                        variant="contained"
                        style={{
                            marginTop: '25px',
                            blockSize: '40px',
                            marginLeft: '75px',
                            width: '200px',
                            display: 'flex',
                        }}
                        type="submit"
                        color="primary"
                    >
                        Register
                    </Button>
                </form>
            </Paper>
        </Grid>
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
