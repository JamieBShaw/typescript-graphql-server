import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { TextField, Button, Grid, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import useStyles from './Styles';

const Login: React.FC = () => {
    const classes = useStyles();

    const [errors, setErrors] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },

        onSubmit: (values) => {
            LoginUser({
                variables: {
                    username: values.username,
                    password: values.password,
                },
            });
        },
    });

    const [LoginUser] = useMutation(LOGIN_USER, {
        update(_, { data }) {
            console.log(data);
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].message);
        },
    });

    return (
        <Grid justify="center" container spacing={2}>
            <Paper
                variant="elevation"
                className={classes.control}
                elevation={3}
            >
                <form
                    onSubmit={formik.handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        className={classes.inputs}
                        id="username"
                        name="username"
                        type="text"
                        label="Username or Email"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        error={!!errors}
                        helperText={errors}
                    />
                    <TextField
                        className={classes.inputs}
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={!!errors}
                        helperText={errors}
                    />
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
                        Login
                    </Button>
                </form>
            </Paper>
        </Grid>
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
