import React from 'react'
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Colors from "../../Colors";

const BorderButton = styled.button`
  background-color: ${({backgroundColor}) => Colors[backgroundColor]};
  color: ${({fontColor}) => Colors[fontColor]};

  width: ${(props) => props.width};
  height: ${(props) => props.height};

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    color: ${({fontColor}) => Colors[fontColor]};
    background-color: ${({backgroundColor}) => Colors[backgroundColor]+"_DARK"};
  }
`

const SolidButton = styled.button`
  background-color: ${({backgroundColor}) => Colors[backgroundColor]};
  color: ${({fontColor}) => Colors[fontColor]};

  width: ${(props) => props.width};
  height: ${(props) => props.height};

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    color: ${({fontColor}) => Colors[fontColor]};
    background-color: ${({backgroundColor}) => Colors[backgroundColor]+"_DARK"};
  }
`
function BasicButton(props) {
  
    return (
        <Button {...props} className={['btn', 'basic-btn', props.className].join(' ')}>
          {props.children}
        </Button>
    )
}

export default BasicButton

BasicButton.propTypes = {
  type : PropTypes.oneOf["solid", "border"],
  color: PropTypes.string,
  fontColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

SolidButton.defaultProps = {
  type : "solid",
  color: "ST_BLUE",
  fontColor: "ST_WHITE",
  backgroundColor: "ST_YELLOW",
  width: "245px",
  height: "38px",
};