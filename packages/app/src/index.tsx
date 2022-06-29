import App from "app";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { store } from "store";

ReactDom.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);
