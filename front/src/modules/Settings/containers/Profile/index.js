import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.scss';

class Profile extends PureComponent {
  render() {
    const { user } = this.props;
    return (
      <div className="Profile">
        <div>First name: {user.firstName}</div>
        <div>Last name: {user.lastName}</div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({ user: auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
