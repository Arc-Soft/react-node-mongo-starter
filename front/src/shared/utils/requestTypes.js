const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

/**
 * @param {String} base 
 * @returns {{REQUEST,SUCCESS,FAILURE}}
 */
export default function createRequestTypes(base, additional = []) {
  return [REQUEST, SUCCESS, FAILURE, ...additional].reduce((acc, type) => Object.assign(acc, { [type]: `${base}_${type}` }), {});
}
