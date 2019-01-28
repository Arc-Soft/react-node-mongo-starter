import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form';
import settings from './modules/Settings/reducers';
import auth from './shared/reducers/auth';

export default (history) =>  combineReducers({
  auth,
  settings,
  form: formReducer,
  router: connectRouter(history),
});
