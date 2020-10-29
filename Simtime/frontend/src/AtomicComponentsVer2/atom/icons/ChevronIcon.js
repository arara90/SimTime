// Chevron-up
import React from 'react'
import PropTypes from "prop-types";

//fontAwesome
import { faChevronUp as solid}  from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ChevronIcon(props) {
  const {size} = props
    return (
        <FontAwesomeIcon {...props} icon={solid} size={size}></FontAwesomeIcon>
    )
}

//or font-size: 0em으로 조절
//SIZES = ["xs", "sm", "lg", "1x", "2x", "3x", "5x", "7x", "10x"]; 
ChevronIcon.propTypes = {
    size: PropTypes.oneOf(["xs", "sm", "lg", "1x", "2x", "3x", "5x", "7x", "10x"]),
  };
  
ChevronIcon.defaultProps = {
    size: "1x",

  };