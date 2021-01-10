import React from 'react'
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Colors from "../../Colors";

const Button = styled.button`
  background-color: transparent;
  color: ${({color}) => Colors[color]};

  width: ${({width}) => width};
  height: ${({height}) => height};
  text-decoration: underline;
  
  &:focus {
    outline: none;
    box-shadow: none;
    text-decoration: underline;
  }

  &:hover {
    background-color: transparent;
    color: ${({color}) => Colors[color+"_DARK"]};
    text-decoration: underline;
  }
`
function TextButton(props) {
    return (
        <Button {...props} className={['btn', 'solid-btn', props.className].join(' ')}>
          {props.children}
        </Button>
    )
}

export default TextButton

TextButton.propTypes = {
  type : PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

TextButton.defaultProps = {
  type : "button",
  color: "TEXT",
  width: "auto",
  height: "auto",
};