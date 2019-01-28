import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.scss';

class TextField extends PureComponent {
  setRef = ref => (this.ref = ref);

  render() {
    const {
      label,
      id,
      input,
      meta,
      multiLine,
      noMarginTop,
      className,
      disabled,
      ...props
    } = this.props;

    const labelClasses = classnames('textField__label', {
      'textField__label--top': !!input.value,
      'textField__label--active': meta.active
    });
    const inputClasses = classnames('textField__input', {
      'textField__input--textarea': multiLine,
      'textField__input--noMarginTop': noMarginTop,
      'textField__input--disabled': disabled
    });
    const classes = classnames('textField', className, {
      'textField--noMarginTop': noMarginTop
    });
    const Component = multiLine ? 'textarea' : 'input';

    if (multiLine && this.ref) {
      this.ref.style.height = 'auto';
      this.ref.style.height = this.ref.scrollHeight + 'px';
    }

    return (
      <div className={classes}>
        {label && (
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>
        )}
        <Component
          {...input}
          {...props}
          className={inputClasses}
          ref={this.setRef}
          disabled={disabled}
        />
        {meta.error &&
          meta.touched && <div className="textField__error">{meta.error}</div>}
      </div>
    );
  }
}

TextField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string
};

export default TextField;
