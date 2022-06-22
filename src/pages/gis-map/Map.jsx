import { isEmpty, pick } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Map } from "react-leaflet";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import "react-leaflet-fullscreen/dist/styles.css";
import iconMarkerPin from "../../components/icon-markers/icon-marke-pin";
import icon from "../../components/icon-markers/icon-marker";
import ControlBottomMap from "../../components/leaflet-control/control-bottom";
import ControlTopMap from "../../components/leaflet-control/control-top";
import MyMarkerInfo from "../../components/leaflet-control/control-top/button-note-info/popup-marker";
import MarkerDAA from "../../components/marker-daa";
import { convertListPosition } from "../../helpers/convert-list-possition";
import useGeoLocation from "../../hooks/geo-location";

const ZOOM_LEVEL = 12;

const DamageAssessment = () => {
  const userLocation = useGeoLocation();

  const [center, setCenter] = useState();
  const [colorDraw, setColorDraw] = useState("#ff0000");
  const [map, setMap] = useState(null);
  const [markerChecker, setMarkerChecker] = useState({});
  const [listPositionDraw, setListPositionDraw] = useState([]);
  const [isShowCurrent, setIsShowCurrent] = useState(false);
  const [isStartNote, setIsStartNote] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    if (window.ReactNativeWebView)
      return console.log(window.ReactNativeWebView);
  }, []);

  useEffect(() => {
    if (userLocation) {
      setCenter({
        lat: userLocation.coordinates.lat,
        lng: userLocation.coordinates.lng,
      });
    }
  }, [userLocation]);

  const handleConvertListEdit = (data) => {
    return data.map((value) => pick(value, ["lat", "lng"]));
  };

  const handleCreate = (e) => {
    const { layerType, layer } = e;
    const { _leaflet_id } = layer;

    if (layerType === "polyline") {
      return setListPositionDraw((layers) => [
        ...layers,
        {
          id: _leaflet_id,
          latlngs: layer.editing.latlngs[0],
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polyline",
            coordinates: [convertListPosition(layer.editing.latlngs[0])],
          },
        },
      ]);
    }

    if (layerType === "polygon") {
      setListPositionDraw((layers) => [
        ...layers,
        {
          id: _leaflet_id,
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [convertListPosition(layer.getLatLngs()[0])],
          },
        },
      ]);
    }
  };

  const handleEdited = (e) => {
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map(({ _leaflet_id, editing }) =>
      setListPositionDraw((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? {
                ...l,
                geometry: {
                  ...l.geometry,
                  coordinates: [
                    convertListPosition(
                      handleConvertListEdit(
                        editing.latlngs[0][0].length > 0
                          ? editing.latlngs[0][0]
                          : editing.latlngs[0]
                      )
                    ),
                  ],
                },
              }
            : l
        )
      )
    );
  };

  const handleEditVertex = (e) => {
    const { poly } = e;
    const listPositionEdit =
      poly.editing.latlngs[0][0].length > 0
        ? poly.editing.latlngs[0][0]
        : poly.editing.latlngs[0];

    setListPositionDraw((layers) =>
      layers.map((l) =>
        l.id === poly._leaflet_id
          ? {
              ...l,
              geometry: {
                ...l.geometry,
                coordinates: [
                  convertListPosition(handleConvertListEdit(listPositionEdit)),
                ],
              },
            }
          : l
      )
    );
  };
  const handleEditStop = (e) => {
    const {
      sourceTarget: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) =>
      setListPositionDraw((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? {
                ...l,
                geometry: {
                  ...l.geometry,
                  coordinates: [
                    convertListPosition(
                      editing.latlngs[0][0].length > 0
                        ? editing.latlngs[0][0]
                        : editing.latlngs[0]
                    ),
                  ],
                },
              }
            : l
        )
      )
    );
  };

  const handleDeleted = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) =>
      setListPositionDraw((layers) =>
        layers.filter((l) => l.id !== _leaflet_id)
      )
    );
  };

  const showMyLocation = () => {
    if (userLocation.loaded && !userLocation.error) {
      const { lat, lng } = userLocation.coordinates;
      mapRef.current.leafletElement.flyTo([lat, lng], 20, {
        animate: true,
      });

      setIsShowCurrent(true);
    } else {
      alert(userLocation.error.message);
    }
  };

  const handleSetMarkerChecker = useCallback(
    (value) => {
      setMarkerChecker(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [markerChecker]
  );

  const handleUpdateColorDraw = (value) => {
    setColorDraw(value);
  };

  const handleSetStatustNote = (value) => {
    setIsStartNote(value);
  };

  function changeTransform(coll, value) {
    for (var i = 0, len = coll.length; i < len; i++) {
      coll[i].style["transform"] = value;
      coll[i].style["transition-duration"] = "500ms";
      coll[i].style["transition-property"] = "transform";
    }
  }

  function handleCheckMousePos(event) {
    let canvas = document.getElementsByClassName("leaflet-draw-tooltip");
    if (canvas && canvas.length > 0) {
      changeTransform(
        canvas,
        `translate(${event.clientX}px,${event.clientY}px)`
      );
    }
  }

  document.addEventListener("click", (e) => handleCheckMousePos(e));

  return (
    <Map
      center={center}
      zoom={ZOOM_LEVEL}
      maxZoom={20}
      ref={mapRef}
      className="map-daa-style"
      whenReady={(e) => setMap(e.target)}
      zoomControl={false}
      doubleClickZoom={false}
      // onClick={handleAddPopup}
    >
      <ControlBottomMap showMyLocation={showMyLocation} />

      <ControlTopMap
        listPosition={listPositionDraw}
        onSetMarkerChecker={handleSetMarkerChecker}
        map={map}
        onChangeColorDraw={handleUpdateColorDraw}
        onCreate={handleCreate}
        onEdited={handleEdited}
        onDeleted={handleDeleted}
        onEditVertex={handleEditVertex}
        colorDraw={colorDraw}
        onEditStop={handleEditStop}
        onSetStatusNote={handleSetStatustNote}
        isStartNote={isStartNote}
      />

      <MyMarkerInfo map={map} isShowMarkerNote={isStartNote} />

      <MarkerDAA
        position={markerChecker}
        icon={iconMarkerPin}
        isShowMarker={markerChecker && !isEmpty(markerChecker)}
        isBasicInfo
      />

      <MarkerDAA
        position={[userLocation.coordinates.lat, userLocation.coordinates.lng]}
        icon={icon}
        isShowMarker={
          userLocation.loaded && !userLocation.error && isShowCurrent
        }
        isBasicInfo
      />
    </Map>
  );
};

export default DamageAssessment;
