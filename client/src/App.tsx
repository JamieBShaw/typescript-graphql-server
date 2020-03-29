import React, { useState } from 'react';
import './App.css';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [LoginUser] = useMutation(LOGIN_USER, {
    update(_, { data }) {
      console.log(data);
    },
    variables: {
      username: username,
      password: password,
    },
  });

  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    console.log('IM LOGGING IN');
    LoginUser();
  };
  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <input
          name="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default App;

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
