import App from "app";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "store";

ReactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
