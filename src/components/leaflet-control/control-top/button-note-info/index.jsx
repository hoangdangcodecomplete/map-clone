/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import Control from "react-leaflet-control";

function ButtonNoteInfo({ onSetStatusNote, isStartNote }) {
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
    <Control position="topright">
      <Col className="col-add-info">
        <div className="box-info" onClick={() => onSetStatusNote(true)}></div>
        <ul
          className={classNames("leaflet-draw-actions", {
            "leaflet-is-note-point": isStartNote,
          })}
        >
          <li>
            <a onClick={() => onSetStatusNote(false)} title="Cancel drawing">
              Save
            </a>
          </li>
          <li>
            <a onClick={() => onSetStatusNote(false)} title="Cancel drawing">
              Delete
            </a>
          </li>
        </ul>
      </Col>
    </Control>
  );
}

ButtonNoteInfo.propTypes = {
  onSetStatusNote: PropTypes.func,
  isStartNote: PropTypes.bool,
};

export default ButtonNoteInfo;
