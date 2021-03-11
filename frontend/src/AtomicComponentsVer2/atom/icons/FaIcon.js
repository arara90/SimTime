import React from 'react'
import PropTypes from "prop-types";
import * as faSolid  from "@fortawesome/free-solid-svg-icons"
import * as faRegular from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function FaIcon(props) {
    const {regular, icon} = props
    return (
        <FontAwesomeIcon {...props} icon={regular? faRegular[icon]: faSolid[icon]}></FontAwesomeIcon>
    )
}

//SIZES = ["xs", "sm", "lg", "1x", "2x", "3x", "5x", "7x", "10x"]; //em
// <FaIcon icon="faHeart" regular size="3x" />

FaIcon.propTypes = {
    regular: PropTypes.bool,
    icon: PropTypes.string
  };
  
FaIcon.defaultProps = {
    regular: null,
    icon: "faExclamationTriangle"
  };