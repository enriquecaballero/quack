/*
  - createReducers.js
  Utility function that runs the `create` method for each quack in a given object;
  useful when multiple ducks are being exported or created
*/

export default function createReducers (duxxes = {}, ...callbacks) {
  return Object.keys (duxxes).reduce ((previous, key) => {
    return { ...previous, [key]: duxxes[key].reducer (...callbacks) };
  }, {});
}
