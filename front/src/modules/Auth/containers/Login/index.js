import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import TextField from '../../../../shared/components/TextField';
import Button from '../../../../shared/components/Button';
import Notification from '../../../../shared/components/Notification';
import { getReadableResponse } from '../../../../shared/services/api';
import { login } from '../../../../shared/reducers/auth';
import formValidation from './formValidation';
import logoAsset from './../../../../assets/images/logo.svg';
import AuthLink from './../../components/AuthLink';
import './styles.scss';

export const FORM_NAME = 'auth/LOGIN';
export class Login extends PureComponent {
  login = () => {
    this.props.login(this.props.formValues);
  };
  render() {
    const {
      handleSubmit,
      isLoading,
      isLoaded,
      hasError,
      response,
      submitSucceeded,
      submitFailed
    } = this.props;

    return (
      <div className="login">
        <div className="login__left">
          <div className="login__left__bg" />
          <h1>
            Mama always said - <span>do what you love.</span> <br />
            So we make software...
          </h1>
        </div>
        <div className="login__right">
          <div className="login__wrapper">
            <div className="login__header">
              <img src={logoAsset} className="login__header__logo" alt="" />
              <div className="login__header__title">Login to your account</div>
            </div>
            <form onSubmit={handleSubmit(this.login)}>
              <div className="login__input-wrapper">
                <Field name="email" label="E-mail" component={TextField} />
              </div>
              <div className="login__input-wrapper">
                <Field
                  type="password"
                  name="password"
                  label="Password"
                  component={TextField}
                />
              </div>
              <AuthLink
                to="/auth/register"
                textBefore="Don't have an account? "
              >
                Register
              </AuthLink>
              <Button type="primary" isLoading={isLoading}>
                Login
              </Button>
            </form>
            {(submitSucceeded || submitFailed) && (
              <Notification
                isLoaded={isLoaded}
                isLoading={isLoading}
                hasError={hasError}
              >
                {getReadableResponse(response)}
              </Notification>
            )}
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  formValues: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  })
};

const mapStateToProps = state => ({
  isLoading: state.auth.login.states.isLoading,
  isLoaded: state.auth.login.states.isLoaded,
  hasError: state.auth.login.states.hasError,
  response: state.auth.login.response,
  formValues: getFormValues(FORM_NAME)(state)
});
const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: FORM_NAME, validate: formValidation })
)(Login);
