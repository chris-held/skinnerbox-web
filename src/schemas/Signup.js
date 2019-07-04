import * as Yup from 'yup';
import common from './common';

const signupSchema = Yup.object().shape({
  email: common.email,
  password: common.password,
  passwordConfirmation: Yup.string()
    .label('Password Confirmation')
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
});

export default signupSchema;
