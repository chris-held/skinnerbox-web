import * as Yup from 'yup';
import common from './common';

const loginSchema = Yup.object().shape({
  email: common.email,
  password: common.password,
});

export default loginSchema;
