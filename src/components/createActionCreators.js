/*
  - createActionCreators.js
  Utility function that given a set of actions (see createActions.js)
  it returns an object with thunk-like action creators
*/

export default function createActionCreators (actions) {
  return {
    request: () => ({
      type: actions.request
    }),
    success: data => ({
      type: actions.success,
      data
    }),
    failure: error => ({
      type: actions.failure,
      error
    })
  };
}
