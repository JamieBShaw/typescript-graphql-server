import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { TextField, Button, Grid, Paper } from '@material-ui/core/';
import useStyles from './Styles';
import { Formik, Form, Field } from 'formik';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
};

const Register: React.FC<{}> = () => {
    const classes = useStyles();

    const initialValues: FormValues = { ...initialState };

    const [registerUser] = useMutation(REGISTER_USER, {
        update(_, { data }) {
            console.log(data);
        },
    });

    return (
        <Grid justify="center" container>
            <Paper className={classes.control}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        registerUser({
                            variables: {
                                ...values,
                            },
                        });
                    }}
                >
                    {() => (
                        <Form>
                            <Field
                                label="First Name"
                                name="firstName"
                                type="text"
                                as={TextField}
                            ></Field>
                            <Field
                                label="Last Name"
                                name="lastName"
                                type="text"
                                as={TextField}
                            ></Field>
                            <Field
                                label="Username"
                                name="username"
                                type="text"
                                as={TextField}
                            ></Field>
                            <Field
                                label="Email address"
                                name="email"
                                type="email"
                                as={TextField}
                            ></Field>
                            <Field
                                label="Password"
                                name="password"
                                type="password"
                                as={TextField}
                            ></Field>
                            <Field
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                as={TextField}
                            ></Field>
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
                        </Form>
                    )}
                </Formik>
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
