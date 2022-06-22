/* eslint-disable jsx-a11y/anchor-is-valid */
import { Input } from "antd";
import * as L from "leaflet";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker } from "react-leaflet";

const { TextArea } = Input;

const Icon = ({ index, map }) => {
  // const removeMarker = (index, map) => {
  //   console.log("123");
  //   map.eachLayer((layer) => {
  //     if (layer.options && layer.options.pane === "markerPane") {
  //       if (layer.options.uniceid === index) {
  //         map.removeLayer(layer);
  //       }
  //     }
  //   });
  // };
  console.log(index);
  return (
    <div
      className="leaflet-popup popup-show-info-draw leaflet-zoom-animated"
      style={{ opacity: "1", bottom: "-7px", left: "-120px" }}
    >
      <div className="leaflet-popup-content-wrapper">
        <div className="leaflet-popup-content" style={{ width: " 201px" }}>
          <TextArea
            rows="3"
            placeholder="Input text"
            className="ant-input"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
      </div>
      <div className="leaflet-popup-tip-container">
        <div className="leaflet-popup-tip"></div>
      </div>
      {/* <a
        className="leaflet-popup-close-button"
        onClick={() => console.log("123")}
        href="#"
      >
        ×
      </a> */}
    </div>
  );
};

const removeMarker = (index, map) => {
  map.eachLayer((layer) => {
    if (layer.options && layer.options.pane === "popupPane") {
      if (layer.options.uniceid === index) {
        map.removeLayer(layer);
      }
    }
  });
};

const ShowMarkers = ({ mapContainer, markers }) => {
  return markers.map((marker, index) => {
    return (
      <Marker
        key={index}
        uniceid={index}
        className="popup-show-info-draw"
        position={marker}
        onClick={() => removeMarker(index, mapContainer)}
        icon={L.divIcon({
          className: "my-div-icon",
          html: ReactDOMServer.renderToStaticMarkup(
            <Icon index={index} map={mapContainer} />
          ),
        })}
      />
    );
  });
};

const MyMarkerInfo = ({ map, isShowMarkerNote }) => {
  const [marker, setMarker] = useState([]);

  useEffect(() => {
    if (map && isShowMarkerNote) {
      map.once("click", (e) => {
        const { lat, lng } = e.latlng;

        setMarker((mar) => [...mar, [lat, lng]]);
      });
    }
  }, [map, isShowMarkerNote]);

  return marker.length > 0 ? (
    <ShowMarkers mapContainer={map} markers={marker} />
  ) : null;
};

MyMarkerInfo.propTypes = {
  map: PropTypes.any,
  isShowMarkerNote: PropTypes.bool,
};

export default MyMarkerInfo;
