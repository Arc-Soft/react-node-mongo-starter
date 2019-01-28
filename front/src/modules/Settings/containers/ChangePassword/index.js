import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { changePassword } from './../../reducers';
import TextField from '../../../../shared/components/TextField';
import formValidation from './formValidation';
import Button from '../../../../shared/components/Button';
import './styles.scss';

const FORM_NAME = 'settings/CHANGE_PASSWORD';
class ChangePassword extends PureComponent {
  performChangePassword = () => {
    this.props.changePassword(this.props.formValues);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="ChangePassword">
        <form onSubmit={handleSubmit(this.performChangePassword)}>
          <Field
            type="password"
            name="currentpassword"
            label="Current password"
            autoComplete="off"
            component={TextField}
          />
          <Field
            type="password"
            name="password"
            label="New Password"
            autoComplete="off"
            component={TextField}
          />
          <Field
            type="password"
            name="repassword"
            label="Confirm new password"
            autoComplete="off"
            component={TextField}
          />
          <Button type="primary">Save</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues(FORM_NAME)(state)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePassword }, dispatch);
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: FORM_NAME, validate: formValidation })
)(ChangePassword);
