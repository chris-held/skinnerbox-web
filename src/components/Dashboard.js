import React, { Fragment } from 'react';
import { Container, Grid } from '@material-ui/core';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Header from './Header';
import { EnforceAuth } from './EnforceAuth';
import ActivityList from './ActivityList';
import { tasks, rewards } from '../mocks/activities';

const ME = gql`
  query me {
    me {
      email
    }
  }
`;

const Dashboard = () => (
  <EnforceAuth>
    {/* TODO: get relevant data from apollo */}
    <Query query={ME}>
      {({ loading, error, data: { me } = {} }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error!</div>;
        }
        console.log(me);
        return (
          <Fragment>
            <Header title="0" subtitle="Current Balance" />
            <Container>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={6}>
                  <ActivityList
                    title="Tasks"
                    activities={tasks}
                    onCreate={() => {}}
                    onActivityComplete={() => {}}
                    onActivityEdit={() => {}}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ActivityList
                    title="Rewards"
                    activities={rewards}
                    onCreate={() => {}}
                    onActivityComplete={() => {}}
                    onActivityEdit={() => {}}
                  />
                </Grid>
              </Grid>
            </Container>
          </Fragment>
        );
      }}
    </Query>
  </EnforceAuth>
);

export default Dashboard;
