import { addDecorator, configure } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { theme } from '../src/App';

addDecorator(muiTheme([theme]));

const req = require.context('../src/stories', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
