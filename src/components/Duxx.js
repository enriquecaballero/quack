/*
  - Duxx.js
  Create a simple fetch-and-set reducer "duck" bundle without the boilerplating
*/

import createActions from "./createActions";
import createActionCreators from "./createActionCreators";

const initialState = {
  isFetching: false,
  data: null,
  error: {}
};

const handleErrors = response => {
  const { ok, status, statusText, url } = response;
  if (!ok) {
    throw { status, statusText, url }; // eslint-disable-line
  }
  return response;
};

export default class Duxx {
  constructor (type, data, binding, transformer) {
    this.actions = createActions (type);
    this.actionCreators = createActionCreators (this.actions);
    this.binding = binding;
    this.transformer = transformer;
    this.initialState = this.bind ({ ...initialState, data });
  }
  bind = object => {
    return this.binding ? this.binding (object) : object;
  };
  bindReducerState = (binding, transformer) => {
    this.binding = binding;
    this.transformer = transformer;
    this.initialState = this.bind (this.initialState);
    return this;
  };
  fetch = (...options) => {
    const { request, success, failure } = this.actionCreators;
    return () => {
      return dispatch => {
        dispatch (request ());
        fetch (...options)
          .then (handleErrors)
          .then (response => response.json ())
          .then (data => dispatch (success (data)))
          .catch (error => dispatch (failure (error)));
      };
    };
  };
  reducer = (onSuccess, onError) => {
    return (state = this.initialState, action) => {
      if (this.transformer) state = this.transformer (state);
      switch (action.type) {
        case this.actions.request:
          return this.bind ({
            ...state,
            isFetching: true
          });
        case this.actions.success:
          return this.bind ({
            ...state,
            isFetching: false,
            data: onSuccess ? onSuccess (action.data) : action.data
          });
        case this.actions.failure:
          return this.bind ({
            ...state,
            isFetching: false,
            error: onError ? onError (action.error) : action.error
          });
        default:
          return this.bind (state);
      }
    };
  };
}
