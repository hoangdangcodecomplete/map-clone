import { Col } from "antd";
import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import { message } from "antd";
import Control from "react-leaflet-control";
import { ListColorPickerName } from "../../../../constants/colors-picker";

function SelectColor({ onChangeColorDraw, colorDraw }) {
  const handleChangeColor = (color) => {
    onChangeColorDraw(color.value);
    message.success(`${color.type} color has been selected for drawing.`, 2);
  };
  return (
    <Control position="topright">
      <Col className="col-choose-color-draw">
        {ListColorPickerName.map((color, index) => (
          <div
            key={index}
            className="box-color"
            onClick={() => handleChangeColor(color)}
          >
            <div
              className={classNames("content-menu-pick-color", {
                "dot-pick-color": colorDraw === color.value,
              })}
              style={{ backgroundColor: color.value }}
            />
          </div>
        ))}
      </Col>
    </Control>
  );
}

SelectColor.propTypes = {
  onChangeColorDraw: PropTypes.func,
  colorDraw: PropTypes.string,
};

export default SelectColor;
