import { combineReducers } from "redux";
import { fromJS } from "immutable";
import Duxx, { bindReducerStates, createReducers } from "../../components";

const FOO_IMMUTABLEJS_ACTION = "FOO_IMMUTABLEJS_ACTION";
const BAR_IMMUTABLEJS_ACTION = "BAR_IMMUTABLEJS_ACTION";

const { foo, bar } = bindReducerStates (
  {
    foo: new Duxx (FOO_IMMUTABLEJS_ACTION),
    bar: new Duxx (BAR_IMMUTABLEJS_ACTION)
  },
  fromJS,
  state => state.toJS ()
);

export const getFoo = foo.fetch ("/foo");
export const getBar = bar.fetch ("/bar");

const reducers = createReducers ({ foo, bar }, data => data.text);

export default combineReducers (reducers);
