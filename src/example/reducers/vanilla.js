import { combineReducers } from "redux";
import Duck from "../../components";

const FOO_VANILLAJS_ACTION = "FOO_VANILLAJS_ACTION";
const BAR_VANILLAJS_ACTION = "BAR_VANILLAJS_ACTION";

export const foo = new Duck (FOO_VANILLAJS_ACTION);
export const bar = new Duck (BAR_VANILLAJS_ACTION);

export const getFoo = foo.fetch ("/foo");
export const getBar = bar.fetch ("/bar");

export default combineReducers ({
  foo: foo.reducer (data => data.text),
  bar: bar.reducer (data => data.text)
});
