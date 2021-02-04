// sliders-h
import React from 'react'
import PropTypes from "prop-types";

//fontAwesome
import { faSlidersH as solid }  from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function FilterIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={solid}></FontAwesomeIcon>
    )
}

//SIZES = ["xs", "sm", "lg", "1x", "2x", "3x", "5x", "7x", "10x"]; //em
FilterIcon.propTypes = {
  };
  
FilterIcon.defaultProps = {
  };