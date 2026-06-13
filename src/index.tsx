import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { _Store } from "./Store";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found.");
const root = createRoot(rootElement);
root.render(
  <Provider store={_Store}>
    <App />
  </Provider>
);
