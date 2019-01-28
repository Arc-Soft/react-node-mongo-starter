import get from 'lodash/get';
import { AUTH_INIT, AUTH_LOGOUT, AUTH_VALIDATE_JWT } from '../reducers/auth';

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export default store => next => action => {
  if (action.type !== LOCATION_CHANGE) {
    if (
      get(action.payload, 'code') === 401 &&
      get(action.payload, 'type') === 'API_SERVICE'
    ) {
      store.dispatch({ type: AUTH_LOGOUT.REQUEST });
      return;
    }
    return next(action);
  }
  const auth = get(store.getState(), 'auth');
  if (!auth.isInited) {
    store.dispatch({ type: AUTH_INIT.REQUEST });
  }

  if (auth.token) {
    store.dispatch({ type: AUTH_VALIDATE_JWT.REQUEST });
  }

  return next(action);
};
