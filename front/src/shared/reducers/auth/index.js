import update from 'immutability-helper';
import get from 'lodash/get';
import jwtDecode from 'jwt-decode';
import createRequestType from '../../utils/requestTypes';
import { loadingStates, setLoadingStates } from '../../constants/redux';

export const AUTH_FETCH_CURRENT_USER = createRequestType(
  'auth/FETCH_CURRENT_USER'
);
export const AUTH_UPDATE = 'auth/UPDATE';
export const AUTH_VALIDATE_JWT = createRequestType('auth/VALIDATE_JWT');
export const AUTH_INIT = createRequestType('auth/INIT');
export const AUTH_LOGIN = createRequestType('auth/LOGIN');
export const AUTH_REGISTER = createRequestType('auth/REGISTER');
export const AUTH_LOGOUT = createRequestType('auth/LOGOUT');

export const init = data => ({
  type: AUTH_INIT.REQUEST,
  payload: data
});

export const fetchCurrentUser = data => ({
  type: AUTH_FETCH_CURRENT_USER.REQUEST,
  payload: data
});

export const login = data => ({
  type: AUTH_LOGIN.REQUEST,
  payload: data
});

export const logout = data => ({
  type: AUTH_LOGOUT.REQUEST,
  payload: data
});

export const register = data => ({
  type: AUTH_REGISTER.REQUEST,
  payload: data
});

const initState = {
  token: '',
  user: {},
  isInited: false,
  isAuthorized: false,
  login: {
    states: loadingStates,
    response: '',
  },
  register: {
    states: loadingStates,
    response: '',
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_UPDATE:
      return update(state, {
        $merge: {
          token: action.payload.token,
          user: action.payload.user
        }
      });
    case AUTH_INIT.FAILURE:
      return update(state, {
        $merge: {
          isInited: true
        }
      });
    case AUTH_INIT.SUCCESS:
      return update(state, {
        $merge: {
          isInited: true,
          token: action.payload.token,
          user: action.payload.user
        }
      });
    case AUTH_LOGOUT.SUCCESS:
      return update(state, {
        $merge: {
          token: '',
          isAuthorized: false,
          user: {}
        }
      });
    case AUTH_LOGIN.REQUEST:
      return update(state, {
        $merge: {
          login: { states: setLoadingStates({ isLoading: true }) }
        }
      });
    case AUTH_LOGIN.FAILURE:
      return update(state, {
        $merge: {
          login: {
            response: action.payload.response,
            states: setLoadingStates({ hasError: action.payload })
          }
        }
      });
      
      case AUTH_LOGIN.SUCCESS:
      return update(state, {
        $merge: {
          login: { states: setLoadingStates({ isLoaded: true }) },
          user: get(jwtDecode(action.payload.token), 'user'),
          isAuthorized: true,
          token: action.payload.token
        }
      });
      case AUTH_REGISTER.FAILURE:
        return update(state, {
          $merge: {
            register: {
              response: action.payload.response,
              states: setLoadingStates({ hasError: action.payload })
            }
          }
        });
      default:
      return state;
  }
};

export default reducer;
