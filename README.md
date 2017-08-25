# duxx

[![Build Status](https://travis-ci.org/enriquecaballero/duxx.svg?branch=master)](https://travis-ci.org/enriquecaballero/duxx) [![Greenkeeper badge](https://badges.greenkeeper.io/enriquecaballero/duxx.svg)](https://greenkeeper.io/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Installation
```
npm install --save duxx
```
Duxx requires `redux-thunk` Redux middleware
```
npm install --save redux-thunk
```

## What does this do?

To set up simple fetches in Redux, it involves some boilerplating:

- Three actions

```
export const MY_ACTION_REQUEST = 'MY_ACTION_REQUEST';
export const MY_ACTION_SUCCESS = 'MY_ACTION_SUCCESS';
export const MY_ACTION_FAILURE = 'MY_ACTION_FAILURE';
```

- A few action creators

```
const request = () => ({
  type: MY_ACTION_REQUEST
});

const success = data => ({
  type: MY_ACTION_SUCCESS,
  data
});

const failure = error => ({
  type: MY_ACTION_FAILURE,
  error
});

export const fetchSomething = () => {
  return dispatch => {
    dispatch (request ());
    fetch ('/my/endpoint')
      .then (handleErrors)
      .then (response => response.json ())
      .then (data => dispatch (success (data)))
      .catch (error => dispatch (failure (error)));
}
```

- A reducer

```
const initialState = {
  isFetching: false,
  data: {},
  error: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_ACTION_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case MY_ACTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      };
    case MY_ACTION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
```

You quickly realize that most often than not, you will find yourself having code like that for individual fetches all over the place. Duxx simplifies this by handling all the boilerplating for you. Here's an example of what you have just seen above but using Duxx:
```
const duxx = new Duxx ('MY_ACTION');
export const fetchSomething = duxx.fetch ('/my/endpoint');
export default duxx.reducer ();
```
**What the heck happened here?**

We instantiated a new Duxx instance that took in an action: `MY_ACTION`; created its action counterparts: `MY_ACTION_REQUEST`, `MY_ACTION_SUCCESS`, `MY_ACTION_FAILURE`; and created the three `request`, `success`, `failure` action creators that will be dispatched asynchronously through a _thunked_ fetch. A Duxx instance exposes a `fetch` function that takes in anything a typical fetch does; Duxx handles the promise and the dispatching for you. Finally, exporting the reducer from our Duxx instance, placing it with our other reducers, combined with Redux's `combineReducers` helper function.
