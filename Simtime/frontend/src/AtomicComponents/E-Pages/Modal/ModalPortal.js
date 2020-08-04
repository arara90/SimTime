

import React, { Fragment } from "react";
import ReactDOM from "react-dom";
// import { addEvent, getEvent } from "../../actions/events";

const ModalPortal = (props) => {
  const el = document.getElementById("app-modal");
  return ReactDOM.createPortal(props.children, el);
};

export default ModalPortal;
