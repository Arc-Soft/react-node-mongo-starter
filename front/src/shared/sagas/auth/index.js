import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import get from 'lodash/get';
import jwtDecode from 'jwt-decode';
import store from 'store';
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  AUTH_INIT,
  AUTH_VALIDATE_JWT,
  logout
} from '../../reducers/auth/';
import apiService, { getError } from '../../services/api';
import { STORAGE_AUTH_KEY } from '../../constants/auth';
import { isTokenValid } from '../../services/auth';

function* validateJwt(action) {
  try {
    const auth = store.get(STORAGE_AUTH_KEY);
    const token = get(auth, 'token');
    if (!token) {
      throw new Error('Wrong token');
    }
    if (!isTokenValid(token)) {
      throw new Error('token expired');
    }
    yield put({ type: AUTH_VALIDATE_JWT.SUCCESS, payload: {} });
  } catch (err) {
    yield put({ type: AUTH_LOGOUT.REQUEST, payload: {} });
    yield put({ type: AUTH_VALIDATE_JWT.FAILURE, payload: getError(err) });
  }
}
function* performLogout(action) {
  try {
    const { data } = yield apiService().post('/auth/logout');
    yield put(push('/auth/login'));
    store.remove(STORAGE_AUTH_KEY);
    yield put({ type: AUTH_LOGOUT.SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: AUTH_LOGOUT.FAILURE, payload: getError(err) });
  }
}

function* performLogin(action) {
  try {
    const { data } = yield apiService().post('/auth/login', action.payload);
    yield put(push('/app/dashboard'));
    store.set(STORAGE_AUTH_KEY, data);
    yield put({ type: AUTH_LOGIN.SUCCESS, payload: data });
  } catch (err) {

    yield put({ type: AUTH_LOGIN.FAILURE, payload: getError(err) });
  }
}

function* performRegister(action) {
  try {
    const { data } = yield apiService().post('/auth/register', action.payload);
    yield put({ type: AUTH_LOGIN.REQUEST, payload: action.payload });
    yield put({ type: AUTH_REGISTER.SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: AUTH_REGISTER.FAILURE, payload: getError(err) });
  }
}

function* init() {
  try {
    const auth = store.get(STORAGE_AUTH_KEY);
    const token = get(auth, 'token');
    const user = get(jwtDecode(token), 'user');
    if (!isTokenValid(token)) {
      throw new Error('token expired');
    }
    yield put({ type: AUTH_INIT.SUCCESS, payload: { token, user } });
  } catch (err) {
    yield put({ type: AUTH_INIT.FAILURE, payload: err });
    yield put(logout());
  }
}

function* registerSaga() {
  yield takeEvery(AUTH_REGISTER.REQUEST, performRegister);
}
function* initSaga() {
  yield takeEvery(AUTH_INIT.REQUEST, init);
}
function* loginSaga() {
  yield takeEvery(AUTH_LOGIN.REQUEST, performLogin);
}
function* logoutSaga() {
  yield takeEvery(AUTH_LOGOUT.REQUEST, performLogout);
}
function* validateJwtSaga() {
  yield takeEvery(AUTH_VALIDATE_JWT.REQUEST, validateJwt);
}

export default [loginSaga, registerSaga, logoutSaga, initSaga, validateJwtSaga];
