import React from 'react';
import PropTypes from 'prop-types';

export const EnforceAuth = ({ children }) => {
  const token = window.localStorage.getItem('token');
  if (token && token !== 'null') {
    return <React.Fragment>{children}</React.Fragment>;
  }
  window.location.href = '/login';
  return null;
};

EnforceAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EnforceAuth;
