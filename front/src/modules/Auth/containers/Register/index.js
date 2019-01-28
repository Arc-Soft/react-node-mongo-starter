import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import TextField from '../../../../shared/components/TextField';
import Button from '../../../../shared/components/Button';
import { register } from '../../../../shared/reducers/auth';
import formValidation from './formValidation';
import AuthLink from './../../components/AuthLink';
import logoAsset from './../../../../assets/images/logo.svg';
import Notification from '../../../../shared/components/Notification';
import { getReadableResponse } from '../../../../shared/services/api';
import './styles.scss';

export const FORM_NAME = 'auth/REGISTER';

export class Register extends PureComponent {
  register = () => {
    this.props.register(this.props.formValues);
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
      <div className="Register">
        <div className="col-6">
          <div className="Register__wrapper">
            <img src={logoAsset} className="login__header__logo" alt="" />
            <div className="Register__content">
              <form onSubmit={handleSubmit(this.register)}>
                <Field name="email" label="E-mail" component={TextField} />
                <Field
                  type="password"
                  name="password"
                  label="Password"
                  component={TextField}
                />
                <Field
                  type="password"
                  name="repassword"
                  label="Confirm Password"
                  component={TextField}
                />
                <AuthLink
                  to="/auth/login"
                  textBefore="Already have an account?"
                >
                  Login
                </AuthLink>
                <Button type="primary">Register</Button>
                {(submitSucceeded || submitFailed) && (
                  <Notification
                    isLoaded={isLoaded}
                    isLoading={isLoading}
                    hasError={hasError}
                  >
                    {getReadableResponse(response)}
                  </Notification>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  formValues: PropTypes.shape({
    email: PropTypes.string,
    repassword: PropTypes.string,
    password: PropTypes.string
  })
};

const mapStateToProps = state => ({
  isLoading: state.auth.register.states.isLoading,
  isLoaded: state.auth.register.states.isLoaded,
  hasError: state.auth.register.states.hasError,
  response: state.auth.register.response,
  formValues: getFormValues(FORM_NAME)(state),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ register }, dispatch);
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: FORM_NAME, validate: formValidation })
)(Register);
