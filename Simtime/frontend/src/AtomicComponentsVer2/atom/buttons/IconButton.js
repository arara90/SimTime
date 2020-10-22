import React from 'react'
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  background-color: blue; 
  border: none; 
  color: white;
  padding: 12px 16px;
  font-size: 16px; 
  cursor: pointer; 

  &:hover {
    background-color: darkblue;
  }
`
function IconButton() {
    return (
        <Button class="btn"><i>dd</i></Button>
    )
}

export default IconButton
