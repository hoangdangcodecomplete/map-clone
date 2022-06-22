import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { FeatureGroup, useLeaflet } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

const FeatureGroupControl = ({
  onCreate,
  onEdited,
  onDeleted,
  onEditVertex,
  colorDraw,
  onEditStop,
  listPosition,
  map,
}) => {
  console.log("listPosition", listPosition);

  return (
    <div>
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreate}
          onEdited={onEdited}
          onDeleted={onDeleted}
          onEditVertex={onEditVertex}
          onEditStop={onEditStop}
          draw={{
            polyline: {
              shapeOptions: { color: colorDraw },
              allowIntersection: false,
              showLength: false,
              metric: false,
              feet: false,
            },
            polygon: {
              allowIntersection: false,
              shapeOptions: { color: colorDraw },
              edit: false,
              showLength: true,
              metric: false,
              feet: false,
              showArea: false,
            },
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
          }}
          edit={{
            selectedPathOptions: {
              // this property should be one level up
              color: "#000",
              fillColor: "#000",
            },
          }}
        />
      </FeatureGroup>
    </div>
  );
};

FeatureGroupControl.propTypes = {
  map: PropTypes.any,
  listPosition: PropTypes.array,
  onCreate: PropTypes.func,
  onEdited: PropTypes.func,
  onDeleted: PropTypes.func,
  onEditVertex: PropTypes.func,
  colorDraw: PropTypes.string,
  onEditStop: PropTypes.func,
};

export default FeatureGroupControl;
