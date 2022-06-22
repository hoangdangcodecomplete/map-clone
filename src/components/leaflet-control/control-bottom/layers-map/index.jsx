import { get } from "lodash";
import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";
import { layers } from "../../../../constants/list-layer";

function LayersMap(props) {
  return (
    <LayersControl position="bottomleft">
      {layers.map((layer, index) => {
        let propsLayer = {
          attribution: layer.attribution,
          url: layer.url,
        };
        if (get(layer, "subdomains")) {
          propsLayer = { ...propsLayer, subdomains: get(layer, "subdomains") };
        }
        return (
          <LayersControl.BaseLayer
            key={index}
            checked={index === 0 ? true : false}
            name={layer.name}
          >
            <TileLayer {...propsLayer} />
          </LayersControl.BaseLayer>
        );
      })}
    </LayersControl>
  );
}

export default LayersMap;
