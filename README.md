# duxx

[![Build Status](https://travis-ci.org/enriquecaballero/duxx.svg?branch=master)](https://travis-ci.org/enriquecaballero/duxx) [![Greenkeeper badge](https://badges.greenkeeper.io/enriquecaballero/duxx.svg)](https://greenkeeper.io/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Installation
```
npm install --save duxx
```
Duxx requires [redux-thunk](https://github.com/gaearon/redux-thunk) Redux middleware
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

You quickly realize that most often than not, you will find yourself having code like that for individual fetches all over the place. Duxx simplifies this by handling all the boilerplating for you. With Duxx, the above code looks like this:
```
import Duxx from 'duxx';

const quack = new Duxx ('MY_ACTION');
export const fetchSomething = quack.fetch ('/my/endpoint');
export default quack.reducer ();
```

### What the heck happened here?

We instantiated a new Duxx instance that took in an action: `MY_ACTION`; Duxx then created actions off the provided action: `MY_ACTION_REQUEST`, `MY_ACTION_SUCCESS`, `MY_ACTION_FAILURE`; and the three `request`, `success`, `failure` action creators that will be dispatched asynchronously through a [thunked](https://github.com/gaearon/redux-thunk) fetch. A Duxx instance exposes a `fetch` function that takes in anything a typical fetch does; Duxx handles the promise and the dispatching for you. And finally, we export the reducer from our Duxx instance, placing it with our other reducers, combined with the Redux `combineReducers` helper function.

### What if I use Immutable.js?

Duxx provides a few ways of binding your state with a specific function. Lets say you want to use [Immutable.js](https://facebook.github.io/immutable-js/), you instantiate your Duxx instance like this:
```
import Duxx from 'duxx';
import { fromJS } from 'immutable';

const quack = new Duxx ('MY_ACTION', {}, fromJS, state => state.toJS ());
export const fetchSomething = quack.fetch ('/my/endpoint');
export default quack.reducer ();
```

This tells Duxx that you want to bind your state with `fromJS`, so whenever a new state object is returned, it will be wrapped with `fromJS`, returning an Immutable Map or List. You also need to provide Duxx with a way of transforming your state back to vanilla Javascript so that it can do its state manipulation: `state => state.toJS ()`. Once a new state is ready to be returned, it'll again be wrapped with `fromJS`.

If you have multiple _duxxes_, you can use the provided `bindReducerStates` utility function to bind each individual state intead of passing in `fromJS` through each Duxx instantiation. See below for more information regarding this function.


## API

### `Duxx`

- `constructor(action, initialDataState?, binding?, transformer?)`
  - `action`<br/>
  Constant used to create `REQUEST`, `SUCCESS`, and `FAILURE` actions.

  - `initialDataState`<br/>
  Any success response will set your payload under `data`, this allows your define what data should be initially: `{}`, `[]`, etc.

  - `binding`<br/>
  Function that will bind your state whenever returned.

  - `transformer`<br/>
  Only required if a binding was passed in, necessary to translate your state back to vanilla Javascript.

- `fetch(endpoint, options?)`<br/>
  Performs a fetch, handles the promise, dispatches the action creators.

- `reducer(onSuccess?, onError?)`<br/>
  Reducer that should be included in your `combineReducers` function.

  - `onSuccess`<br/>
  Allows you to return what of the received payload should be set under `data` instead of everything.

  - `onError`<br/>
  Allows you to handle the error and return your own custom error to be set under `error`.

### `bindReducerStates(duxxes, binding, transformer)`
Allows your bind multiple reducers at the same time:
```
const { foo, bar } = bindReducerStates (
  {
    foo: new Duxx (FOO_ACTION),
    bar: new Duxx (BAR_ACTION)
  },
  fromJS,
  state => state.toJS ()
);
```

### `createReducers(duxxes, onSuccess?, onError?)`
Takes in an object with mutiple duxx instances, calls `reducer()` on each instance, returning an object of reducers. Instead of doing:
```
export default {
  foo: foo.reducer (),
  bar: bar.reducer ()
}
```
You can do:
```
export default combineReducers (
  createReducers ({ foo, bar })
);
```
