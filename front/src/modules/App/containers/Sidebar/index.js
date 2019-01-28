import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import get from 'lodash/get';
import round from 'lodash/round';
import { bindActionCreators } from 'redux';
import SidebarLink from '../../components/SidebarLink';
import { logout } from '../../../../shared/reducers/auth';
import logoAsset from './../../../../assets/images/logo.svg';
import './styles.scss';

class Sidebar extends PureComponent {
  state = {
    timer: null,
    counter: 0
  };

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  logout = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.logout();
  };

  getExpiration = () => {
    const { token } = this.props;

    let expiration = token ? get(jwtDecode(token), 'exp') : '';
    if (expiration) {
      const now = new Date().getTime();
      expiration = round(Number(expiration) - now / 1000, 0);
    }
    return expiration;
  }

  render() {
    const expiration = this.getExpiration();
    return (
      <div className="Sidebar">
        <img src={logoAsset} className="Sidebar__logo" alt="" />
        <div className="Sidebar__links">
          <SidebarLink to="/app/dashboard">Dashboard</SidebarLink>
          <SidebarLink to="/app/settings">Settings</SidebarLink>
          <SidebarLink to="/app/logout" onClick={this.logout}>
            Logout
          </SidebarLink>
        </div>
        <div className="Sidebar__expiration">
          {expiration > 0 ? (
            <span>Time until token expiration: {expiration} seconds</span>
          ) : (
            <span>Your session is over</span>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({ token: auth.token });
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
