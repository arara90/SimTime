import React from 'react'
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Colors from "../../Colors";

const Button = styled.button`
  border: solid 2px ${(props) => Colors[props.color]};
  color: ${(props) => Colors[props.color]};
  border-radius: 6px 6px 6px 6px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  &:focus {
    outline: none;
    box-shadow: none;
    
  }

  &:hover {
    border: solid 2px ${(props) => Colors[props.color + "_DARK"]};
    color: ${(props) => Colors[props.color + "_DARK"]};    
}
`
function BorderButton(props) {
    return (
        <Button {...props} className="btn border-btn"></Button>
    )
}

export default BorderButton

BorderButton.propTypes = {
    color: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};

BorderButton.defaultProps = {
    color: "ST_YELLOW",
    width: "245px",
    height: "38px",
};