import React from 'react'
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Colors from "../../Colors";

const Button = styled.button`
  background-color: ${(props) => Colors[props.color]};
  color: ${Colors.ST_WHITE};
  border-radius: 6px 6px 6px 6px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    color: ${Colors.ST_WHITE};
    background-color: ${(props) => Colors[props.color+"_DARK"]};
  }
`
function SolidButton(props) {
    return (
        <Button {...props} className="btn icon-btn">{props.children}</Button>
    )
}

export default SolidButton

SolidButton.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

SolidButton.defaultProps = {
  color: "ST_YELLOW",
  width: "245px",
  height: "38px",
};