import React from 'react'
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Colors from "../../Colors";

const Button = styled.button`
  background-color: ${(props) => props.backgroundColor? Colors[props.backgroundColor] : "transparent"};
  color: ${(props) => Colors[props.color]};
  border-radius: 6px 6px 6px 6px;
  ${(props) => "width: " + props.width };
  height: ${(props) => "height: " + props.height};

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    background-color: ${(props) => Colors[props.backgroundColor+"_DARK"]};
    color: ${(props) => Colors[props.color + "_DARK"]};    
  }

`
function IconButton(props) {
    return (
        <Button {...props} className=" btn icon-btn">{props.children}</Button>
    )
}

export default IconButton

IconButton.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

IconButton.defaultProps = {
  backgroundColor:null,
  color: "MAIN_COLOR",
//   width: "2em",
//   height: "2em",
};