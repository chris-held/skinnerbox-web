import React from 'react';

import { storiesOf } from '@storybook/react';

import { ApolloProvider } from 'react-apollo';
import Signup from '../components/Signup';
import { getMockClient } from '../apollo';

storiesOf('Signup', module).add('Default', () => (
  <ApolloProvider client={getMockClient({})}>
    <Signup />
  </ApolloProvider>
));
