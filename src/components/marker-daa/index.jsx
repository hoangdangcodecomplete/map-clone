import PropTypes from "prop-types";
import React from "react";
import { Marker, Popup } from "react-leaflet";

function MarkerDAA({
  children,
  position,
  icon,
  isShowMarker = true,
  isBasicInfo = false,
}) {
  if (!isShowMarker) return <></>;
  return (
    <Marker position={position} icon={icon}>
      {!isBasicInfo ? children : <Popup>You are here.</Popup>}
    </Marker>
  );
}

MarkerDAA.propTypes = {
  children: PropTypes.element,
  position: PropTypes.any,
  icon: PropTypes.any,
  isShowMarker: PropTypes.bool,
  isBasicInfo: PropTypes.bool,
};

export default MarkerDAA;
