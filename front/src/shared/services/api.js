import axios from 'axios';
import store from 'store';
import get from 'lodash/get';
import { STORAGE_AUTH_KEY } from '../constants/auth';
import responses from '../constants/responses';

export default () => {
  const auth = store.get(STORAGE_AUTH_KEY);
  const headers = {};
  if (auth && auth.token) {
    headers['Authorization'] = `Bearer ${auth.token}`;
  }
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers
  });
  instance.interceptors.response.use(
    response => response,
    error => Promise.reject({ ...error.response.data, type: 'API_SERVICE' })
  );
  return instance;
};
export const getError = response => ({
  response: response.message || 'common.error'
});
export const getReadableResponse = response =>
  get(responses, response) || responses.common.error;
