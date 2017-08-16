import { combineReducers } from "redux";
import { fromJS } from "immutable";
import Duck, { bindReducerStates } from "../../components";

const FOO_IMMUTABLEJS_ACTION = "FOO_IMMUTABLEJS_ACTION";
const BAR_IMMUTABLEJS_ACTION = "BAR_IMMUTABLEJS_ACTION";

const { foo, bar } = bindReducerStates (
  {
    foo: new Duck (FOO_IMMUTABLEJS_ACTION),
    bar: new Duck (BAR_IMMUTABLEJS_ACTION)
  },
  fromJS,
  state => state.toJS ()
);

export const getFoo = foo.fetch ("/foo");
export const getBar = bar.fetch ("/bar");

export default combineReducers ({
  foo: foo.reducer (data => data.text),
  bar: bar.reducer (data => data.text)
});
