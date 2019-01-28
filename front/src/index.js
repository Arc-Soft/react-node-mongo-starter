import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import App from './modules/App';
import Auth from './modules/Auth';
import * as serviceWorker from './serviceWorker';
import AuthorizedRoute from './shared/components/AuthorizedRoute'
import { store, history } from './store';
import 'normalize.css';
import './assets/styles/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="BaseApp">
        <AuthorizedRoute path="/app/" component={App} />
        <Route path="/auth" component={Auth} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
