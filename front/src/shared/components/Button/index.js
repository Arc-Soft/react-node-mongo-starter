import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = ({ children, onClick, isLoading, uppercase, type, ...props }) => {
  const buttonClasses = classnames('button', {
    [`button--${type}`]: type,
    'button--uppercase': uppercase,
  })
  const loaderClasses = classnames({
    'button__loader': true,
    'button__loader--active': isLoading,
    'button__loader--primary': type === 'default',
  })

  return (
    <button className={buttonClasses} onClick={onClick} {...props}>
      {children}
      <span className={loaderClasses}></span>
    </button>
  );
}

Button.defaultProps = {
  type: 'default',
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
}

export default Button;