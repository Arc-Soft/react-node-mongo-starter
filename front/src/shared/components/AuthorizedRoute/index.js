import React from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AuthorizedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return rest.isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

AuthorizedRoute.propTypes = {
  isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth }) => ({ isAuthorized: auth.isAuthorized });
export default connect(mapStateToProps)(AuthorizedRoute);
