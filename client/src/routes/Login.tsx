import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface StateProps {
    username: string;
    password: string;
}

const initialState = {
    username: '',
    password: '',
};

const Login: React.FC = () => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState<StateProps>(initialState);

    const [LoginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data }) {
            console.log(data);
        },
        onError(err) {
            console.log(err.graphQLErrors[0]);
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
        <div className="App ">
            <Form onSubmit={onSubmit} noValidate>
                <Form.Row>
                    <Col>
                        <Form.Label>Email address or username </Form.Label>
                        <Form.Control
                            name="username"
                            value={values.username}
                            onChange={onChange}
                            type="text"
                            placeholder="Email or Username"
                        ></Form.Control>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name="password"
                            value={values.password}
                            onChange={onChange}
                            type="password"
                            placeholder="Password"
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            "Your Email/Username or Password is incorrect"
                        </Form.Control.Feedback>
                    </Col>
                </Form.Row>

                <Button style={{ marginTop: '10px' }} size="sm" type="submit">
                    {loading ? 'Loading' : 'Login'}
                </Button>
            </Form>
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
