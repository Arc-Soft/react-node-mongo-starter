import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import ChangePassword from './containers/ChangePassword';
import ChangePersonal from './containers/ChangePersonal';
import { Link } from 'react-router-dom';
import Profile from './containers/Profile';
import './styles.scss';

const Settings = ({ isAuthorized }) => {
  return (
    <div className="Settings">
      <div className="Settings__links">
        <Link to="/app/settings" className="Settings__link">
          Profile
        </Link>
        <Link to="/app/settings/change-password" className="Settings__link">
          Change Password
        </Link>
        <Link to="/app/settings/change-personal" className="Settings__link">
          Change Personal
        </Link>
      </div>
      <Route
        path="/app/settings"
        component={Profile}
        key="settings-default"
        exact
      />
      <Route
        path="/app/settings/change-password"
        component={ChangePassword}
        key="settings-change-password"
      /> 
      <Route
        path="/app/settings/change-personal"
        component={ChangePersonal}
        key="settings-change-personal"
      />
    </div>
  );
};

Settings.propTypes = {
  isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth }) => ({ isAuthorized: auth.isAuthorized });
export default connect(mapStateToProps)(Settings);
