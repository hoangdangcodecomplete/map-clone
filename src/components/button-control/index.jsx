import PropTypes from "prop-types";
import React from "react";

const ButtonControl = ({
  onStopMoving,
  onStartMoving,
  isTouchCheck,
  onShow,
  onTouchCheckPoint,
}) => {
  return <div onClick={onShow} className="button-get-location"></div>;
};

ButtonControl.propTypes = {
  onStopMoving: PropTypes.func,
  onStartMoving: PropTypes.func,
  onShow: PropTypes.func,
  isTouchCheck: PropTypes.bool,
  onTouchCheckPoint: PropTypes.func,
};

export default ButtonControl;
