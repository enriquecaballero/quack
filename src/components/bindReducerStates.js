/*
  - bindReducerStates.js
  Utility function for wrapping multiple duck instance states with a given function;
  useful when using ImmutableJS (e.g. fromJS)
*/

export default function bindReducerStates (ducks = {}, binding, transformer) {
  return Object.keys (ducks).reduce ((previous, key) => {
    return {
      ...previous,
      [key]: ducks[key].bindReducerState (binding, transformer)
    };
  }, {});
}
