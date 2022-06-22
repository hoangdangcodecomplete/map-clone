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
  let layers = [];

  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);

  useEffect(() => {
    let dataLayer = new L.GeoJSON(listPosition);
    let i = 0;
    dataLayer.eachLayer((layer) => {
      layer.feature.properties.editLayerId = i;
      layers.push(layer);
      i++;
    });
    console.log("layers", layers);
  }, [listPosition]);

  function handleLayerClick(e, drawControl) {
    setSelectedLayerIndex(e.target.feature.properties.editLayerId);
  }

  function EditableLayer(props) {
    const editLayerRef = useRef();
    let drawControlRef = useRef();

    useEffect(() => {
      if (!props.showDrawControl) {
        map.removeControl(drawControlRef.current);
      } else {
        map.addControl(drawControlRef.current);
      }

      editLayerRef.current.leafletElement.clearLayers();

      editLayerRef.current.leafletElement.addLayer(props.layer);
      props.layer.on("click", function (e) {
        props.onLayerClicked(e, drawControlRef.current);
      });
    }, [props, map]);

    function onMounted(ctl) {
      drawControlRef.current = ctl;
    }

    return (
      <div>
        <FeatureGroup ref={editLayerRef}>
          <EditControl
            position="topright"
            onCreated={onCreate}
            onEdited={onEdited}
            onDeleted={onDeleted}
            onEditVertex={onEditVertex}
            onEditStop={onEditStop}
            onMounted={onMounted}
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
  }

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
