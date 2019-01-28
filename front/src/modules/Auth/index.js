import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Login from './containers/Login';
import Register from './containers/Register';

const AuthContainer = ({ isAuthorized }) => {
  if (isAuthorized) {
    return <Redirect to="/app/dashboard" />;
  }

  return [
    <Route path="/auth/login" component={() => <Login />} key="auth-login" />,
    <Route
      path="/auth/register"
      component={() => <Register />}
      key="auth-register"
    />
  ];
};

AuthContainer.propTypes = {
  isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth }) => ({ isAuthorized: auth.isAuthorized });
export default connect(mapStateToProps)(AuthContainer);
