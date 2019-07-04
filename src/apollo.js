import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { MockLink } from 'apollo-link-mock';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { Socket as PhoenixSocket } from 'phoenix';

export const getMockClient = ({ link, mocks = [] }) => {
  const cache = new InMemoryCache({ addTypename: false });

  return new ApolloClient({
    cache,
    link: link || new MockLink(mocks),
  });
};

const ws = 'ws://localhost:4000/socket';
const absintheSocket = createAbsintheSocketLink(
  AbsintheSocket.create(
    new PhoenixSocket(ws, {
      params: () => ({
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      }),
    }),
  ),
);

const uri = 'http://localhost:4000/graphiql';

const onErrorMiddleware = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.info(`[GraphQL error]: ${message}`, locations, path);
      console.log(message);
      if (message === 'unauthenticated') {
        localStorage.setItem('token', '');
        window.location.reload('/');
      }
    });
  }

  if (networkError) console.info(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create an http link:
const httpLink = new HttpLink({
  uri,
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  absintheSocket,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: ApolloLink.from([onErrorMiddleware, link]),
  cache: new InMemoryCache(),
});

export default client;
