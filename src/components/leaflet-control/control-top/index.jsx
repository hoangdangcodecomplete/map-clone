import React from "react";
import RowButtonActionMobile from "./row-button-action-mobile";
import PropTypes from "prop-types";
import ListPositionDraw from "./list-position-draw";
import SelectColor from "./select-color";
import FeatureGroupControl from "./draw-shape";
import ButtonNoteInfo from "./button-note-info";
// import FreehandsDraw from "./freehand-draw";

function ControlTopMap({
  listPosition,
  onSetMarkerChecker,
  map,
  onChangeColorDraw,
  onCreate,
  onEdited,
  onDeleted,
  onEditVertex,
  colorDraw,
  onEditStop,
  onSetStatusNote,
  isStartNote,
}) {
  return (
    <>
      <RowButtonActionMobile />
      <ListPositionDraw
        listPosition={listPosition}
        onSetMarkerChecker={onSetMarkerChecker}
      />
      {/* <FreehandsDraw map={map} /> */}
      <FeatureGroupControl
        map={map}
        listPosition={listPosition}
        onCreate={onCreate}
        onEdited={onEdited}
        onDeleted={onDeleted}
        onEditVertex={onEditVertex}
        colorDraw={colorDraw}
        onEditStop={onEditStop}
      />

      <SelectColor
        onChangeColorDraw={onChangeColorDraw}
        colorDraw={colorDraw}
      />
      <ButtonNoteInfo
        onSetStatusNote={onSetStatusNote}
        isStartNote={isStartNote}
      />
    </>
  );
}
ListPositionDraw.propTypes = {
  listPosition: PropTypes.array,
  onSetMarkerChecker: PropTypes.func,
  map: PropTypes.any,
  onChangeColorDraw: PropTypes.func,
  onCreate: PropTypes.func,
  onEdited: PropTypes.func,
  onDeleted: PropTypes.func,
  onEditVertex: PropTypes.func,
  colorDraw: PropTypes.string,
  onEditStop: PropTypes.func,
  onSetStatusNote: PropTypes.func,
  isStartNote: PropTypes.bool,
};

export default ControlTopMap;
