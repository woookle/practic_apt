import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import "./style/css/index.css";
import 'animate.css';
import { fetchProfile } from "./api/api.js";
import { store } from "./redux/store.js";

const Root = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return <App />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
