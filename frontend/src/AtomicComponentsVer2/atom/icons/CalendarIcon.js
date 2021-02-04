// calendar-alt
import React from 'react'
import PropTypes from "prop-types";

//fontAwesome
import { faCalendarAlt as solid }  from "@fortawesome/free-solid-svg-icons"
import { faCalendarAlt as regular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CalendarIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={props.regular? regular: solid}></FontAwesomeIcon>
    )
}

//SIZES = ["xs", "sm", "lg", "1x", "2x", "3x", "5x", "7x", "10x"]; //em
CalendarIcon.propTypes = {
    regular: PropTypes.bool,
  };
  
CalendarIcon.defaultProps = {
    regular: null,
  };