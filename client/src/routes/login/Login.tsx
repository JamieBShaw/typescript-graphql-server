import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { TextField, Button, Grid, Paper } from '@material-ui/core';
import useStyles from './Styles';

interface StateProps {
    username: string;
    password: string;
}

const initialState = {
    username: '',
    password: '',
};

const Login: React.FC = () => {
    const classes = useStyles();
    const [errors, setErrors] = useState<string | null>(null);
    const [values, setValues] = useState<StateProps>(initialState);

    const [LoginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data }) {
            console.log(data);
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].message);
        },
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('SUBMITTING');
        LoginUser({
            variables: {
                username: values.username,
                password: values.password,
            },
        });
    };

    return (
        <Grid justify="center" container spacing={2}>
            <Paper
                variant="elevation"
                className={classes.control}
                elevation={3}
            >
                <form onSubmit={onSubmit} noValidate autoComplete="off">
                    <TextField
                        id="standard-basic"
                        label="First Name"
                        name="username"
                        value={values.username}
                        onChange={onChange}
                        type="text"
                        error={!!errors}
                        helperText={errors}
                    ></TextField>

                    <TextField
                        id="standard-basic"
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={onChange}
                        type="password"
                        error={!!errors}
                        helperText={errors}
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
                        {loading ? 'Loading' : 'Login'}
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
