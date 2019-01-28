import jwtDecode from 'jwt-decode';
import round from 'lodash/round';
export const isTokenValid = token => {
  if (!token) {
    return false;
  }
  const auth = jwtDecode(token);
  const now = new Date().getTime();
  const expiration = round(Number(auth.exp) - now / 1000);
  return expiration > 0 ? true : false 
};
