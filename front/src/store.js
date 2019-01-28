import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducers';
import authMiddleware from './shared/middlewares/auth';
import documentTitle from './shared/middlewares/documentTitle';
import mySaga from './sagas';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();
const enhancers = [];
const sagaMiddleware = createSagaMiddleware();

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}
const composedEnchancers = compose(
  applyMiddleware(
    routerMiddleware(history),
    authMiddleware,
    documentTitle,
    sagaMiddleware
  ),
  ...enhancers
);

export const store = createStore(reducer(history), {}, composedEnchancers);
mySaga.forEach(saga => sagaMiddleware.run(saga));
