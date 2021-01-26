import React from 'react'
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Colors from "../../Colors";

const Button = styled.button`
  background-color: ${({color}) => Colors[color]};
  color: ${({fontColor}) => Colors[fontColor]};
  border-radius: 6px 6px 6px 6px;
  width: ${({width}) => width};
  height: ${({height}) => height};

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    background-color: ${({color}) => Colors[color+"_DARK"]};
    color: ${({fontColor}) => Colors[fontColor]};
  }
`
function SolidButton(props) {
    return (
        <Button {...props}>
          {props.children}
        </Button>
    )
}

export default SolidButton

SolidButton.propTypes = {
  type : PropTypes.string,
  fontColor: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

SolidButton.defaultProps = {
  type : "button",
  fontColor: "ST_WHITE",
  color: "ST_YELLOW",
  width: "100%",
  height: "38px",
};