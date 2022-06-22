import React from "react";
import { withLeaflet } from "react-leaflet";
import PrintControlDefault from "react-leaflet-easyprint";

const PrintControl = withLeaflet(PrintControlDefault);

function PrintImageMap(props) {
  return (
    <PrintControl
      position="bottomleft"
      sizeModes={["Current", "A4Portrait", "A4Landscape"]}
      hideControlContainer={false}
      title="Export as PNG"
      exportOnly
    />
  );
}

export default PrintImageMap;
