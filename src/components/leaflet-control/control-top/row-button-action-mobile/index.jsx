import Control from "react-leaflet-control";
import React from "react";
import { message } from "antd";

function RowButtonActionMobile(props) {
  return (
    <Control position="topleft" className="group-button-main-func">
      <div
        onClick={() => window.ReactNativeWebView.postMessage("back")}
        className="button-get-location button-back"
      />
      <div
        onClick={() => message.info("Button save")}
        className="button-get-location  button-save"
      />
    </Control>
  );
}

export default RowButtonActionMobile;
