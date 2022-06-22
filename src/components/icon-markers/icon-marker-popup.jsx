import L from "leaflet";

export default L.divIcon({
  className: "my-div-icon",
  html: "<div class='leaflet-popup popup-show-info-draw leaflet-zoom-animated' style='opacity: 1; bottom: -7px; left: -120px;'><div class='leaflet-popup-content-wrapper'><div class='leaflet-popup-content' style='width: 201px;'><textarea rows='3' placeholder='Input text' class='ant-input'></textarea></div></div><div class='leaflet-popup-tip-container'><div class='leaflet-popup-tip'></div></div><a class='leaflet-popup-close-button' href='#close'>×</a></div>",
});
