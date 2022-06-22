import React from "react";
import PropTypes from "prop-types";
import GetMyLocation from "./get-location";
import ZoomControlMap from "./zoom-control";
import LayersMap from "./layers-map";
import PrintImageMap from "./print-image-map";

function ControlBottomMap({ showMyLocation }) {
  return (
    <>
      <GetMyLocation showMyLocation={showMyLocation} />
      <ZoomControlMap />
      <PrintImageMap />
      <LayersMap />
    </>
  );
}

ControlBottomMap.propTypes = {
  showMyLocation: PropTypes.func,
};

export default ControlBottomMap;
