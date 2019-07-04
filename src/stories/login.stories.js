import React from 'react';

import { storiesOf } from '@storybook/react';

import { ApolloProvider } from 'react-apollo';
import Login from '../components/Login';
import { getMockClient } from '../apollo';

storiesOf('Login', module).add('Default', () => (
  <ApolloProvider client={getMockClient({})}>
    <Login />
  </ApolloProvider>
));
