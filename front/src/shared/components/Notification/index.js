import React, { PureComponent } from 'react';
import classnames from 'classnames';
import './styles.scss';
export class Notification extends PureComponent {
  render() {
    const { hasError, isLoading, isLoaded, children } = this.props;
    const classes = classnames('Notification', {
      'Notification--success': isLoaded,
      'Notification--error': hasError,
      'Notification--hidden': isLoading || (!isLoaded && !hasError)
    });

    return <div className={classes}>{children}</div>;
  }
}

export default Notification;
