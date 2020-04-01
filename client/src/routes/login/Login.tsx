import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { TextField, Button, Container, FormGroup } from '@material-ui/core';
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
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState<StateProps>(initialState);

    const [LoginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data }) {
            console.log(data);
        },
        onError(err) {
            console.log(err.graphQLErrors);
            console.log(errors);
            setErrors(err.graphQLErrors);
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
        <Container fixed maxWidth="md">
            <FormGroup row>
                <form
                    className={classes.formContainer}
                    onSubmit={onSubmit}
                    noValidate
                    autoComplete="offa"
                >
                    <TextField
                        id="standard-basic"
                        label="First Name"
                        className={classes.title}
                        name="username"
                        value={values.username}
                        onChange={onChange}
                        type="text"
                        required
                    ></TextField>

                    <TextField
                        id="standard-basic"
                        style={{ marginLeft: '10px' }}
                        required
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={onChange}
                        type="password"
                    ></TextField>

                    <Button
                        size="small"
                        variant="contained"
                        style={{
                            marginTop: '25px',
                            blockSize: '40px',
                            marginLeft: '10px',
                        }}
                        type="submit"
                        color="primary"
                    >
                        {loading ? 'Loading' : 'Login'}
                    </Button>
                </form>
            </FormGroup>
        </Container>
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