import React, { Fragment } from 'react';
import { Typography, Container } from '@material-ui/core';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Header from './Header';
import { EnforceAuth } from './EnforceAuth';

const ME = gql`
  query me {
    me {
      email
    }
  }
`;

const Dashboard = () => (
  <EnforceAuth>
    <Query query={ME}>
      {({ loading, error, data: { me } = {} }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error!</div>;
        }
        return (
          <Fragment>
            <Header title="Dashboard" subtitle="Rhymes with Smashboard" />
            <Container>
              <Typography variant="body1">
                {`Hello there! You're logged in as ${me.email}`}
              </Typography>
            </Container>
          </Fragment>
        );
      }}
    </Query>
  </EnforceAuth>
);

export default Dashboard;
