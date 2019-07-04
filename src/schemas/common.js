import * as Yup from 'yup';

export default {
  email: Yup.string()
    .email('Enter a valid email address')
    .required()
    .label('Email Address'),
  password: Yup.string()
    .required()
    .label('Password'),
};
