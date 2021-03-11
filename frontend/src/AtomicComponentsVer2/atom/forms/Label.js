import React from 'react'
import styled from "styled-components";
import PropTypes from "prop-types";
import * as Color from "../../Colors"

const MyLabel = styled.label`
  color: ${({color}) => Color[color]};
  font-size: ${({fontSize}) => fontSize};
  width: 100%; 
  height: auto;
  
` 


function Label(props) {
  return (
    <MyLabel {...props}></MyLabel>
  )
}

export default Label


Label.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.string,
};

Label.defaultProps = {
  color: "MAIN_COLOR",
  fontSize: "18px",
};