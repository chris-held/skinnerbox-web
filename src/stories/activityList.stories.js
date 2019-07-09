import React from 'react';

import { storiesOf } from '@storybook/react';

import ActivityList from '../components/ActivityList';

import { tasks } from '../mocks/activities';

storiesOf('ActivityList', module)
  .add('Default', () => (
    <ActivityList
      title="Tasks"
      activities={tasks}
      onCreate={() => {}}
      onActivityComplete={() => {}}
      onActivityEdit={() => {}}
    />
  ))
  .add('No Tasks', () => (
    <ActivityList
      title="Tasks"
      activities={[]}
      onCreate={() => {}}
      onActivityComplete={() => {}}
      onActivityEdit={() => {}}
    />
  ));
