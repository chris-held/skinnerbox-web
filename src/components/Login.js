import React, { Fragment } from 'react';
import { Container, Button, Grid } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Header from './Header';
import loginSchema from '../schemas/Login';

const SIGNIN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
    }
  }
`;

const Login = ({ history }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const submitClick = async (values, login) => {
    console.log('login was clicked', values);
    try {
      const { data: { signin } = {} } = await login({
        variables: values,
      });
      window.localStorage.setItem('token', signin.token);
      history.push('/');
    } catch (error) {
      console.log('Login error, need to handle this...', error);
    }
  };

  return (
    <Mutation mutation={SIGNIN}>
      {login => (
        <Fragment>
          <Header title="Login" subtitle="Log In to Continue" />
          <Container>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={values => submitClick(values, login)}
            >
              {({ isValid, isValidating, submitForm }) => (
                <Form>
                  <Grid container spacing={4} direction="row">
                    <Grid item xs={12}>
                      <Field
                        name="email"
                        type="text"
                        id="email"
                        label="Email"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="password"
                        type="password"
                        id="password"
                        label="Password"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={submitForm}
                        disabled={!(isValid || isValidating)}
                        type="button"
                        variant="outlined"
                        color="primary"
                      >
                        Submit
                      </Button>
                      <Button
                        onClick={() => {
                          history.push('/signup');
                        }}
                        type="submit"
                        variant="outlined"
                      >
                        Signup
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Container>
        </Fragment>
      )}
    </Mutation>
  );
};
Login.propTypes = {
  history: PropTypes.object.isRequired,
};
export default Login;
