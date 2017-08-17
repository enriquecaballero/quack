import { combineReducers } from "redux";
import Duxx from "../../components";

const FOO_VANILLAJS_ACTION = "FOO_VANILLAJS_ACTION";
const BAR_VANILLAJS_ACTION = "BAR_VANILLAJS_ACTION";

export const foo = new Duxx (FOO_VANILLAJS_ACTION);
export const bar = new Duxx (BAR_VANILLAJS_ACTION);

export const getFoo = foo.fetch ("/foo");
export const getBar = bar.fetch ("/bar");

export default combineReducers ({
  foo: foo.reducer (),
  bar: bar.reducer (data => data.text)
});
