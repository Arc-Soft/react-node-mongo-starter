import React from 'react';
import Sidebar from './containers/Sidebar';
import { Route } from 'react-router';
import './styles.scss';
import Settings from '../Settings';

export default () => (
  <div className="App">
    <div className="App__wrapper">
      <div className="App__sidebar">
        <Sidebar />
      </div>
      <div className="App__content">
        <Route path="/app/" component={() => <div>daash</div>} exact />
        <Route
          path="/app/dashboard"
          component={() => <div>dashboard</div>}
          exact
        />
        <Route path="/app/settings" component={Settings} />
      </div>
    </div>
  </div>
);
