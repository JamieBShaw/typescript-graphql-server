import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';

import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const authToken = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export const WrappedApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
