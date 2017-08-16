import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import store from "./store";
import Example from "./Example";

declare var module: any;

const render = Component => {
  ReactDOM.render (
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById ("root")
  );
};

render (Example);

if (module.hot) {
  module.hot.accept ("./Example", () => {
    render (Example);
  });
}
