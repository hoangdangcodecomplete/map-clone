import L from "leaflet";

export default L.divIcon({
  iconAnchor: [25, 55],
  popupAnchor: [2, -40],
  className: "my-div-icon",
  html: "<div class='ring-container'><div class='ringring'></div><div class='circle'></div></div>",
});
