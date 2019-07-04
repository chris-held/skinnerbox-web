import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { ApolloProvider } from 'react-apollo';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import client from './apollo';

// TODO: move any global styles here - move this section into it's own file
export const theme = createMuiTheme({
  coolGradient:
    'linear-gradient(90deg, rgba(163,100,217,1) 0%, rgba(12,215,246,1) 100%)',
  colors: {
    black: '#000',
    white: '#FFF',
    grey: {
      dark: '#333333',
      light: '#CCC',
    },
  },
  overrides: {
    MuiContainer: {
      root: {
        marginTop: 32,
      },
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
