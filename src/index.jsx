import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import App from "./App";
import SafeArea from "react-safe-area-component";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <SafeArea top bottom>
      <App />
    </SafeArea>
  </React.StrictMode>,
  rootElement
);
