import React, { Fragment } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useQuery } from 'react-apollo';
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

const Loading = () => <div>Loading...</div>;

const Error = () => <div>Error!</div>;

const Dashboard = () => {
  const { loading, error, data: { me } = {} } = useQuery(ME);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  console.log(me);
  return (
    <EnforceAuth>
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
    </EnforceAuth>
  );
};

export default Dashboard;
