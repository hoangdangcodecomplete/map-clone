import React from "react";
import PropTypes from "prop-types";
import Control from "react-leaflet-control";

function GetMyLocation({ showMyLocation }) {
  return (
    <Control position="bottomright">
      <div onClick={showMyLocation} className="button-get-location"></div>
    </Control>
  );
}
GetMyLocation.propTypes = {
  showMyLocation: PropTypes.func,
};

export default GetMyLocation;
