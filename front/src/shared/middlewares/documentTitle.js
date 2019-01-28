import find from 'lodash/find';
import { routes } from '../constants/routes';

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export default store => next => action => {
  if (action.type !== LOCATION_CHANGE) {
    return next(action);
  }
  const route = find(routes, { path: action.payload.location.pathname });
  const titleParts = [];
  if (route) {
    titleParts.push(route.title);
  }

  titleParts.push('My app name')
  document.title = titleParts.join(' - ');
  return next(action);
};
