import React from 'react'
import PropTypes from "prop-types";

//fontAwesome
import { faHeart as solid }  from "@fortawesome/free-solid-svg-icons"
import { faHeart as regular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function HeartIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={props.regular? regular: solid}></FontAwesomeIcon>
    )
}

//SIZES = ["xs", "sm", "lg", "1x", "2x", "3x", "5x", "7x", "10x"]; //em
HeartIcon.propTypes = {
    regular: PropTypes.bool,
  };
  
HeartIcon.defaultProps = {
    regular: null,
  };