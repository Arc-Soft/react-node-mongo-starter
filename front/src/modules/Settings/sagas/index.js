import { put, takeEvery } from 'redux-saga/effects';
import get from 'lodash/get';
import store from 'store';
import jwtDecode from 'jwt-decode';
import {
  SETTINGS_CHANGE_PASSWORD,
  SETTINGS_CHANGE_PERSONAL
} from '../reducers/';
import apiService, { getError } from '../../../shared/services/api';
import { AUTH_UPDATE } from '../../../shared/reducers/auth';
import { STORAGE_AUTH_KEY } from '../../../shared/constants/auth';

function* performChangePassword(action) {
  try {
    const { data } = yield apiService().post(
      '/settings/change-password',
      action.payload
    );
    yield put({ type: SETTINGS_CHANGE_PASSWORD.SUCCESS, payload: { ...data } });
  } catch (err) {
    yield put({ type: SETTINGS_CHANGE_PASSWORD.FAILURE, payload: getError(err) });
  }
}

function* performChangePersonal(action) {
  try {
    const { data } = yield apiService().post(
      '/settings/change-personal',
      action.payload
    );
    const user = get(jwtDecode(data.token), 'user');
    store.set(STORAGE_AUTH_KEY, data);
    yield put({ type: AUTH_UPDATE, payload: { token: data.token, user } });
    yield put({
      type: SETTINGS_CHANGE_PERSONAL.SUCCESS,
      payload: { response: data.message }
    });
  } catch (err) {
    yield put({
      type: SETTINGS_CHANGE_PERSONAL.FAILURE,
      payload: getError(err)
    });
  }
}

function* changePasswordSaga() {
  yield takeEvery(SETTINGS_CHANGE_PASSWORD.REQUEST, performChangePassword);
}
function* changePersonalSaga() {
  yield takeEvery(SETTINGS_CHANGE_PERSONAL.REQUEST, performChangePersonal);
}

export default [changePasswordSaga, changePersonalSaga];
