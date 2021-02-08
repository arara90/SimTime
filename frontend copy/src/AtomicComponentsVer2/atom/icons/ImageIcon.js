// image
import React from 'react'
import PropTypes from "prop-types";

//fontAwesome
import { faImage as solid }  from "@fortawesome/free-solid-svg-icons"
import { faImage as regular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ImageIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={props.regular? regular: solid}></FontAwesomeIcon>
    )
}

//SIZES = ["xs", "sm", "lg", "1x", "2x", "3x", "5x", "7x", "10x"]; //em
ImageIcon.propTypes = {
    regular: PropTypes.bool,
  };
  
ImageIcon.defaultProps = {
    regular: null,
  };