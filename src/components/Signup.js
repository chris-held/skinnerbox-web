import React, { Fragment } from 'react';
import { Container, Button, Grid } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import Header from './Header';
import signupSchema from '../schemas/Signup';

const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;

const Signup = ({ history }) => {
  const initialValues = {
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const [signup] = useMutation(SIGNUP);

  const submitClick = async (values) => {
    console.log('signup was clicked', values);
    try {
      const { data: { signup: result } = {} } = await signup({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      window.localStorage.setItem('token', result.token);
      history.push('/');
    } catch (error) {
      console.log('Signup error, need to handle this...', error);
    }
  };

  return (
    <Fragment>
      <Header title="Signup" subtitle="Create an Account" />
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={values => submitClick(values, signup)}
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
                  <Field
                    name="passwordConfirmation"
                    type="password"
                    id="passwordConfirmation"
                    label="Confirm Password"
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={submitForm}
                    disabled={!(isValid || isValidating)}
                    variant="outlined"
                    color="primary"
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={() => {
                      history.push('/login');
                    }}
                    type="submit"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </Fragment>
  );
};
Signup.propTypes = {
  history: PropTypes.object.isRequired,
};
export default Signup;
