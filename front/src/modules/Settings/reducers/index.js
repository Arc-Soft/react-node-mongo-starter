import update from 'immutability-helper';
import createRequestType from '../../../shared/utils/requestTypes';
import {
  loadingStates,
  setLoadingStates
} from '../../../shared/constants/redux';

export const SETTINGS_CHANGE_PASSWORD = createRequestType(
  'settings/CHANGE_PASSWORD'
);
export const SETTINGS_CHANGE_PERSONAL = createRequestType(
  'settings/CHANGE_PERSONAL'
);

export const changePersonal = data => ({
  type: SETTINGS_CHANGE_PERSONAL.REQUEST,
  payload: data
});

export const changePassword = data => ({
  type: SETTINGS_CHANGE_PASSWORD.REQUEST,
  payload: data
});

const initState = {
  changePassword: {
    states: loadingStates
  },
  changePersonal: {
    response: '',
    states: loadingStates
  }
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SETTINGS_CHANGE_PERSONAL.REQUEST:
      return update(state, {
        $merge: {
          changePersonal: { states: setLoadingStates({ isLoading: true }) }
        }
      });
    case SETTINGS_CHANGE_PERSONAL.FAILURE:
      return update(state, {
        $merge: {
          changePersonal: {
            response: action.payload.response,
            states: setLoadingStates({ hasError: action.payload })
          }
        }
      });
    case SETTINGS_CHANGE_PERSONAL.SUCCESS:
      return update(state, {
        $merge: {
          changePersonal: {
            response: action.payload.response,
            states: setLoadingStates({ isLoaded: true })
          }
        }
      });
    case SETTINGS_CHANGE_PASSWORD.REQUEST:
      return update(state, {
        $merge: {
          changePassword: { states: setLoadingStates({ isLoading: true }) }
        }
      });
    case SETTINGS_CHANGE_PASSWORD.FAILURE:
      return update(state, {
        $merge: {
          changePassword: {
            states: setLoadingStates({ hasError: action.payload })
          }
        }
      });
    case SETTINGS_CHANGE_PASSWORD.SUCCESS:
      return update(state, {
        $merge: {
          changePassword: { states: setLoadingStates({ isLoaded: true }) }
        }
      });
    default:
      return state;
  }
};

export default reducer;
