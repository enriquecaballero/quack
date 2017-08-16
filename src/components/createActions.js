/*
  - createActions.js
  Utility function that given a type, it returns an object with three thunk-like types
*/

export default function createActions (type) {
  return {
    request: `${type}_REQUEST`,
    success: `${type}_SUCCESS`,
    failure: `${type}_FAILURE`
  };
}
