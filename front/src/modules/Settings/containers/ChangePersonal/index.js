import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import get from 'lodash/get';
import { changePersonal } from './../../reducers';
import TextField from '../../../../shared/components/TextField';
import Notification from '../../../../shared/components/Notification';
import formValidation from './formValidation';
import Button from '../../../../shared/components/Button';
import './styles.scss';
import { getReadableResponse } from '../../../../shared/services/api';

const FORM_NAME = 'settings/CHANGE_PASSWORD';
class ChangePersonal extends PureComponent {
  performChangePersonal = () => {
    this.props.changePersonal(this.props.formValues);
  };

  render() {
    const {
      handleSubmit,
      isLoading,
      isLoaded,
      hasError,
      response
    } = this.props;

    return (
      <div className="ChangePersonal">
        <form onSubmit={handleSubmit(this.performChangePersonal)}>
          <Field
            type="text"
            name="firstName"
            label="First name"
            autoComplete="off"
            component={TextField}
          />
          <Field
            type="text"
            name="lastName"
            label="Last name"
            autoComplete="off"
            component={TextField}
          />
          <Button type="primary" isLoading={isLoading}>
            Save
          </Button>
          <Notification
            isLoaded={isLoaded}
            isLoading={isLoading}
            hasError={hasError}
          >
            {getReadableResponse(response)}
          </Notification>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues(FORM_NAME)(state),
  initialValues: get(state, 'auth.user'),
  isLoading: get(state, 'settings.changePersonal.states.isLoading'),
  isLoaded: get(state, 'settings.changePersonal.states.isLoaded'),
  hasError: get(state, 'settings.changePersonal.states.hasError'),
  response: get(state, 'settings.changePersonal.response')
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePersonal }, dispatch);
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: FORM_NAME, validate: formValidation })
)(ChangePersonal);
