/*
  - createReducers.js
  Utility function that runs the `create` method for each quack in a given object;
  useful when multiple ducks are being exported or created
*/

export default function createReducers (ducks = {}, ...callbacks) {
  return Object.keys (ducks).reduce ((previous, key) => {
    return { ...previous, [key]: ducks[key].reducer (...callbacks) };
  }, {});
}
