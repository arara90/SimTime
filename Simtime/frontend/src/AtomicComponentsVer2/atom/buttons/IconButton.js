import React from 'react'
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Colors from "../../Colors";

const Button = styled.button`
  background-color: ${(props) => props.backgroundColor? Colors[props.backgroundColor] : "transparent"};
  color: ${(props) => Colors[props.color]};
  ${(props) => "width: " + props.width };
  ${(props) => "height: " + props.height};

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
        <Button {...props} className={['btn', 'icon-btn', props.className].join(' ')} type={props.type}>
          {props.children}
        </Button>
    )
}

export default IconButton

IconButton.propTypes = {
  type : PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

IconButton.defaultProps = {
  type : "button",
  backgroundColor:null,
  color: "MAIN_COLOR",
//   width: "2em",
//   height: "2em",
};