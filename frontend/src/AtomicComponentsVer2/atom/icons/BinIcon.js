// trash-alt

import React from 'react'
import PropTypes from "prop-types";

//fontAwesome
import { faTrashAlt as solid }  from "@fortawesome/free-solid-svg-icons"
import { faTrashAlt as regular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function BinIcon(props) {
  const {size} = props
  return (
      <FontAwesomeIcon {...props} icon={props.regular? regular: solid} size={size}></FontAwesomeIcon>
  )
}

//SIZES = ["xs", "sm", "lg", "1x", "2x", "3x", "5x", "7x", "10x"]; //em
BinIcon.propTypes = {
    regular: PropTypes.bool,
  };
  
  BinIcon.defaultProps = {
    regular: null,
  };